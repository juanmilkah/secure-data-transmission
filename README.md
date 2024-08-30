# Secure Data Transmission using RSA and AES in Node.js

This Node.js project demonstrates secure data transmission by combining RSA (asymmetric encryption) and AES (symmetric encryption). The code encrypts a secret message using AES, secures the AES key with RSA encryption, and simulates the transmission of this data to a receiver who can decrypt and read the original message.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Example Output](#example-output)
- [License](#license)

## Features

- **Asymmetric Encryption**: RSA is used to encrypt the AES key, allowing secure transmission between parties.
- **Symmetric Encryption**: AES is used to encrypt the actual data, offering fast and secure encryption.
- **Authentication**: The AES-GCM mode provides both encryption and authentication, ensuring the integrity and authenticity of the data.

## Installation

To run this project, you need to have Node.js installed. Clone this repository and install the necessary dependencies.

```bash
git clone https://github.com/williammuchui/secure-data-transmission.git
cd secure-data-transmission
npm install
```

## Usage

Run the main.js script to see the encryption and decryption process in action.

```bash
node main.js --trace-warnings
```

## How It Works

- **Key Generation**: A pair of RSA keys (public and private) is generated for both the sender and receiver.
- **AES Key Generation**: A random 256-bit AES key is generated for encrypting the message.
- **Data Encryption**: The secret message is encrypted using the AES key in aes-256-gcm mode, which also generates an authentication tag.
- **AES Key Encryption**: The AES key is encrypted using the receiver's RSA public key.
- **Data Transmission**: The encrypted data, AES key, IV (Initialization Vector), and authentication tag are sent to the receiver.
- **Data Decryption**: The receiver decrypts the AES key using their private RSA key, then decrypts the message using the AES key, IV, and authentication tag.

## Example Output

```plaintext
Data encrypted!
Data sent successfully! >>       681cbb9620dcf091ea3626f39b56d321054177e2ec4e097059
Sender public key: >>    -----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw8JYBqaRq2BahvgW7yt7
rQ6Vg+yWLrdCJ/0pfmeB162V8m6qCjgFTVlcT0Hgqv8jx1bFADHfjJSUgQk2yPOz
j+nl9BSc7VXPBRXsU+jGM5b3jx/fyH8uXqKivcVieWkMnk7eyso3fKvT+sQUKzNQ
j3/YB+01c+86QZ+h9O1VGFmJ5uijAt4ZFqDL9qM8WI4ScCqPxrJcndhXM3oKw/6J
KgJ3qxrFrFl3b5VHkt1qN25IJol07Y4VtHBaqokYd7jkGWQYtJOmbRpTS6cd+AtN
AkaREwFpnYgIJh/i5iTwwhgU1sFjcH5lItlAyTN2PQCAHJy4IOSZ9x4niTp5f/hK
ZQIDAQAB
-----END PUBLIC KEY-----

IV:  2ef22f119faab2c22ace52d16aa98649
Encrypted AES key:  57d667bafff973c260ed64771398e022c55661747143b20b5061d85939ed1aa4196cdcf4eb04208a77cc03fc5acb3a13a5250c20897f41e83441094dcaff00d11f5ee0ecbfb25e0a5898dcc7cbb7f4d04616f5fdf41b0d969615e8b1faad664fb6196356e20d91ccebd204eb12a14e799d962a6fa52d4591e4a6ae6d8cba1d8e793af19366d1c0103053bc0eb6efb5f93b712368bedca271f70ada256f5948f61c0202f989f7223ed900f68f7d1ba8a3181b048bf8f75c1506dd8aa64dc8f0f0582ff287e0d790f61d49fc4cf4b7f501352fd35968cbc907108bfce671d802316cc7266b6b50adacc65b61948d58c5156fb5b7957201f5e016da867731e28a16
Data sent to receiver!
Received Data: >> This is a secret message!
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
