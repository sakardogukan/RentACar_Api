"use strict"
/* -------------------- LOGGING ------------------- */

const morgan = require('morgan')
const fs = require('node:fs')

const now = new Date()
const today = now.toISOString().split('T')[0]

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
})

/*
Bayrak seçeneği, dosyaların yazılması veya üzerine yazılmasıyla ilgili farklı davranışları ayarlamanıza olanak tanır.
    'r' - Okumak için dosyayı açın. Dosya mevcut değilse bir istisna oluşur.
    'r+' - Dosyayı okumak ve yazmak için açın. Dosya mevcut değilse bir istisna oluşur.
    'w' - Yazmak için dosyayı açın. Dosya oluşturulur (eğer mevcut değilse) veya kesilir (varsa).
    'w+' - Dosyayı okumak ve yazmak için açın. Dosya oluşturulur (eğer mevcut değilse) veya kesilir (varsa).
    'a' - Dosyayı eklemek için açın. Dosya mevcut değilse oluşturulur.
    'a+' - Dosyayı okumak ve eklemek için açın. Dosya mevcut değilse oluşturulur.
*/