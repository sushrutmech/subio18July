// import * as CryptoJS from 'crypto-js';

// const secreteKey = "okCIwPcWXZ2FD2p475UAiucQngdwmDqn";

// export function EncryptString(value: string): string {
//     var key = CryptoJS.enc.Utf8.parse(secreteKey);
//     var iv = CryptoJS.enc.Utf8.parse(secreteKey);
//     var encrypted = CryptoJS.AES.encrypt(
//         CryptoJS.enc.Utf8.parse(value.toString()),
//         key,
//         {
//             keySize: 128 / 8,
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }
//     );
//     return encrypted.toString();
// }

// export function DecryptString(value: string) {
//     try {
//         var key = CryptoJS.enc.Utf8.parse(secreteKey);
//         var iv = CryptoJS.enc.Utf8.parse(secreteKey);
//         var decrypted = CryptoJS.AES.decrypt(
//             value,
//             key,
//             {
//                 keySize: 128 / 8,
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7
//             }
//         );
//         var str = decrypted.toString(CryptoJS.enc.Utf8);
//         return JSON.parse(str);
//     } catch (e) {
//         return null;
//     }
// }