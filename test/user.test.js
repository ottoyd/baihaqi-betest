require('dotenv').config()
const app = require('../index')
const request = require('supertest')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiYmFpaGFxaSIsImlhdCI6MTcxMjQ0NzEwM30.cbDl5tASKf_blzHPQgZOaovntvLB-oA3j2ysXdohKyw'

// MOCKUP
const userRegister = {
    userName: 'TEST___userName',
    accountNumber: 'TEST___accountNumber',
    emailAddress: 'TEST___emailAddress@gmail.com',
    identityNumber: 'TEST___identityNumber'
}

describe('=== INITIAL DELETE ===', () => {
    describe('POST /user/deleteTest', () => {
        test('INITIAL DELETE', done => {
            request(app)
                .delete(`/user/deleteTest/${userRegister.userName}`)
                .set('authorization', token)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    } else {
                        return done()
                    }
                })
        })
    })
})
describe('=== USER TEST ===', () => {
    describe('Success create', () => {
        describe('POST /user/create', () => {
            test('should return object with userName, accountNumber, emailAddress, identityNumber 201', done => {
                request(app)
                    .post('/user/create')
                    .set('authorization', token)
                    .send(userRegister)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body.data).toHaveProperty('userName', userRegister.userName)
                            expect(res.body.data).toHaveProperty('accountNumber', userRegister.accountNumber)
                            expect(res.body.data).toHaveProperty('emailAddress', userRegister.emailAddress)
                            expect(res.body.data).toHaveProperty('identityNumber', userRegister.identityNumber)
                            expect(res.body.data).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
    })

    describe('Duplicate create', () => {
        describe('POST /user/create', () => {
            test('should return Error status 400', done => {
                request(app)
                    .post('/user/create')
                    .set('authorization', token)
                    .send(userRegister)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            return done()
                        }
                    })
            })
        })
    })
})