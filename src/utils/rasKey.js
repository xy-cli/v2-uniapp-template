import { JSEncrypt } from 'jsencrypt'

const rasKey = {
  qa: 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIz/oecBeEqH/VA7SvRm0S3A0lm01oyYNMn6iDlfANWiJTVPT+y/CdSa+bGA5KuB0qk4rmopW9lzDsd3KP5hPww9CqAmYdzXeUjBL6DTloyqYe3n1F/O+rmrxPiYkNgoT7dQ4njDhD4IpEq7tIgC4oJlrPc58TQy6IVbA49lSb+XAgMBAAECgYAkqIXgeIpc3lRm2rOXLXAvNBW8iv7JGP2IkeF/AQtHf9uqq489H0IgC5blpnxNdvhdVMZMBarCs15hT8LRuFjao7ve3uLlQ/R64HU4XmXWS4UEq/Hbk0e9TX2swdhcsMD41ydpRIYWhfFfDSCwiFp/eDf+jtmcOS4PPJ84oIWBwQJBAMpDu5OI8RWLIjHCu0u6ew0EBT+nUrb2ZOSjf1dif5S3nhu2PoL/Ko9fL6MRyrdf8H4CEp+eRSmK5JZfkZlqQ/cCQQCydR8Je7FI9T6hVTxgkV9QuQ8HmkzqSwbrDeiAjU6Rjk8F5wEGddsOidt9mm+iJ7C1ihFwFoUK++7x07R7PDlhAkBjJ9FNAlUtuoeI3W30Mfcg6leoXN6v0xqi+4Px0te4kEtySmVa0ryKjJ9N0esO+nlrTJjUp0JAm1Z0YWV/UBkBAkAGexJhech6ac2Ydkv3BdB8UfwlvojEiWz65EppQLh1uMFN6ZGz9lu6L291JEKhlOdp8FWpyGeUeom25oVLZGiBAkEAhjAWXDNd68IwmP6hefx6bPdGuuwu+Vow7hLaHZbQdpgTG+Odi9mGTBXs0FbZ7lbZwWb4gXxkpqImS3MXiXMDTg==',
  online: 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKhtYXJqM5BNUJtE+EEVgUjIR0e3pHgcx8067veYe58+8nnjtiIY+j9suWUROEuX1kJePL/t0v98HOLzDUqDk8TROStpSishRYrFqTuSncHl9pnXEc6/Yur7+jesjhtyqWQcidSO3c/6MPlLklrL1OSHM/7PsV3rJwlqulFuVWKtAgMBAAECgYApqAvu8WdZbFXgYTmJV1lHeAlxKnFqJ6wfDVFnOXZx126/SNuWKVlTcH+WCKFEyQP8HDSoP5jtCXRXiUejQ1G7eFBkRlZyKao9SqVfcjxSRkq52JQ9UeSr1KIiQmpd1YeSDwfR5ZZHMUTXLmn5jW964pAwPGxyRh8zhYtECG/IwQJBANDeKhYkYEjcBNp8DHQiYKtr4+GfbMn1HR7I2SO6sKNsBETeu4/FQK/YcIH6Q+U0FynIHrFDMbmFfICb/mqO4VECQQDObw3KUMJUr7oOMkix+6Hg3X/IFgHF49nAewBM9TY32c04V+3fjZw7i++JiEvZxYR58ZJ/vYZh99I8sPWptPSdAkB9EKpOu9VTizr0wFaMq5EK0/2NufJgM38OUeGDPWRLVoBv5JaWjdwf7w/fJEXHVpuQDx4hskRx+/YC5GVA1PEhAkEAjbDuHzq1WBlRtGLRQND9uHFwPq7UQrb1BEeo2inJMCaf1JeN3068uKaBIL5bibsoBedI7cLxlRbbx+qShAx/hQJAJA3z340B0MYrV4iJhyqCmUTYFfd3Vy81Qe4Fq3SYSrSMbebcEmYJOQCzT3WZIt6MPKAeJ+TyOdC5I27TbbQKQg=='
}
const key = process.env.VUE_APP_ENV === 'online' ? rasKey.online : rasKey.qa
export default {
  encrypted: (val) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(val) || '---'
  },
  uncrypted: (val) => {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(key)
    return decrypt.decrypt(val) || '---'
  }
}
