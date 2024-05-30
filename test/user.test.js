let app = require('../app')
let request = require('supertest')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiYmFpaGFxaSIsImlhdCI6MTcxMjQ0NzEwM30.cbDl5tASKf_blzHPQgZOaovntvLB-oA3j2ysXdohKyw'

describe('=== USER TEST ===', () => {
    describe('Success create', () => {
        describe('POST /user/create', () => {
            test('should return object with id and email and status 201', done => {
                let data = {
                    userName: 'TEST___userName',
                    accountNumber: 'TEST___accountNumber',
                    emailAddress: 'TEST___emailAddress',
                    identityNumber: 'TEST___identityNumber'
                }
                request(app)
                    .post('/user/create')
                    .set('authorization', token)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('userName', data.userName)
                            expect(res.body).toHaveProperty('accountNumber', data.accountNumber)
                            expect(res.body).toHaveProperty('emailAddress', data.emailAddress)
                            expect(res.body).toHaveProperty('identityNumber', data.identityNumber)
                            expect(res.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
    })
})