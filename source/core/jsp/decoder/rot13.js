/**
 * php::rot13 解码器
 */

 'use strict';
 const rot13encode = (s) => {
   //use a Regular Expression to Replace only the characters that are a-z or A-Z
   return s.replace(/[a-zA-Z]/g, function (c) {
     // Get the character code of the current character and add 13 to it If it is
     // larger than z's character code then subtract 26 to support wrap around.
     return String.fromCharCode((c <= "Z" ?
         90 :
         122) >= (c = c.charCodeAt(0) + 13) ?
       c :
       c - 26);
   });
 };
 
 module.exports = {
   asoutput: () => {
     return `yv66vgAAADIAKwoACgAZBwAaCgACABsKAAIAHAoAAgAdCgACAB4KAAIAHwkACQAgBwAhBwAiAQADcmVzAQASTGphdmEvbGFuZy9TdHJpbmc7AQAGPGluaXQ+AQAVKExqYXZhL2xhbmcvU3RyaW5nOylWAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEADVN0YWNrTWFwVGFibGUHACEHACMHABoBAAh0b1N0cmluZwEAFCgpTGphdmEvbGFuZy9TdHJpbmc7AQAKU291cmNlRmlsZQEAEkFzb3V0cHV0Um90MTMuamF2YQwADQAkAQAWamF2YS9sYW5nL1N0cmluZ0J1ZmZlcgwADQAODAAlACYMACcAKAwAKQAqDAAVABYMAAsADAEADUFzb3V0cHV0Um90MTMBABBqYXZhL2xhbmcvT2JqZWN0AQAQamF2YS9sYW5nL1N0cmluZwEAAygpVgEABmxlbmd0aAEAAygpSQEABmNoYXJBdAEABChJKUMBAAlzZXRDaGFyQXQBAAUoSUMpVgAhAAkACgAAAAEAAAALAAwAAAACAAEADQAOAAEADwAAAPwAAwAFAAAAlSq3AAG7AAJZK7cAA00DPh0stgAEogB4LB22AAU2BBUEEGGhABUVBBBtowAOFQQQDWCSNgSnAEsVBBBBoQAVFQQQTaMADhUEEA1gkjYEpwAyFQQQbqEAFRUEEHqjAA4VBBANZJI2BKcAGRUEEE6hABIVBBBaowALFQQQDWSSNgQsHRUEtgAGhAMBp/+GKiy2AAe1AAixAAAAAgAQAAAAMgAMAAAAAwAEAAQADQAFABcABgAeAAcANwAIAFAACQBpAAoAfwALAIYABQCMAA0AlAAOABEAAAAdAAb/AA8ABAcAEgcAEwcAFAEAAPwAJwEYGBX5AAwAAQAVABYAAQAPAAAAHQABAAEAAAAFKrQACLAAAAABABAAAAAGAAEAAAARAAEAFwAAAAIAGA==`.replace(/\n\s+/g, '');
   },
   decode_buff: (buff) => {
     return Buffer.from(rot13encode(buff.toString()));
   }
 }