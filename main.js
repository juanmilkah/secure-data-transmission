import crypto from "node:crypto";
import { Buffer } from "node:buffer";

// Generate private-public key pair using RSA algorithm
function generatePrivatePublicKeys() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        resolve({ publicKey, privateKey });
      }
    );
  });
}

// Encrypt data using AES (symmetric key)
function encryptData(data, aesKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();
  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}

// Decrypt data using AES (symmetric key)
function decryptData(data, aesKey, iv, authTag) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    aesKey,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

// Encrypt AES key using RSA (asymmetric key)
function encryptAesKey(aesKey, publicKey) {
  return crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    aesKey
  );
}

// Decrypt AES key using RSA (asymmetric key)
function decryptAesKey(encryptedAesKey, privateKey) {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedAesKey
  );
}

// Send data
function sendData(data, senderPublicKey, encryptedAesKey, iv, authTag) {
  console.log("Encrypted Data sent successfully! >>", data);
  console.log("Sender public key: >>", senderPublicKey);
  console.log("IV: ", iv);
  console.log("Encrypted AES key: ", encryptedAesKey.toString("hex"));
  console.log("Auth Tag: ", authTag);
  return true;
}

// Main function
async function main() {
  try {
    const { publicKey } = await generatePrivatePublicKeys();
    const secretMessage = "This is a secret message!";
    console.log("Secret Data>>", secretMessage);

    const { publicKey: receiverPublicKey, privateKey: receiverPrivateKey } =
      await generatePrivatePublicKeys();

    const aesKey = crypto.randomBytes(32); // Generate a 256-bit AES key
    const { encryptedData, iv, authTag } = encryptData(secretMessage, aesKey);
    console.log("Data encrypted!");

    const encryptedAesKey = encryptAesKey(aesKey, receiverPublicKey);
    const sent = sendData(
      encryptedData,
      publicKey,
      encryptedAesKey,
      iv,
      authTag
    );
    if (sent) {
      console.log("Data sent to receiver!");
    } else {
      throw new Error("Data not sent!");
    }

    // On the client side: decrypt the AES key using the private key, then decrypt the data using the AES key
    const decryptedAesKey = decryptAesKey(encryptedAesKey, receiverPrivateKey);
    const decryptedData = decryptData(encryptedData, aesKey, iv, authTag);
    console.log("Received Data: >>", decryptedData);
  } catch (e) {
    console.error("An error occurred:", e.message);
  }
}

main();
