const { age, date } = require("../../lib/utils")
const member = require('../models/member')

module.exports = {
    index(req, res){

        let { filter, page, limit } = req.body

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter, 
            page,
            limit,
            offset,
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return res.render("members/index", { members, pagination, filter})
            }
        }

        member.paginate(params)

    },
    create(req, res){

        member.membersSelectOptions(function (options) {
            return res.render(`member/create`, { instructorOptions: options })
        })

        
    },
    post(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == "") 
                return res.send('Please, fill all fields!')
        }

        member.create(req.body, function (member) {
            return res.redirect(`/members/${member.id}`)
        })


        
    },
    show(req, res){
        member.find(req.params.id, function (member) {
            if (!member) return res.send("member not found!") 

            member.age = date(member.birth).birthDay

            return res.render("members/show", { member })
        })
    },
    edit(req, res){
        member.find(req.params.id, function (member) {
            if (!member) return res.send("member not found!") 

            member.membersSelectOptions(function (options) {
                return res.render(`member/edit`, { member, instructorOptions: options })
            })

            member.birth = date(member.birth).iso

        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (res.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        member.update(req.body, function () {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    pull(req, res){
        return
    },
    delete(req, res){
        member.delete(req.body.id, function () {
            return res.redirect(`/members`)
        })
    }
}    
