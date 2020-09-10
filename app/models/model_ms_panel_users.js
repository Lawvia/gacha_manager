const mysql = require('../module/mysql_connector')

module.exports = {
    getById: async function(id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users " +
                "WHERE id_panel_users=? "
            var data_input = [id_panel_users]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getList: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users " +
                "WHERE " +
                "username LIKE ? " +
                "OR active LIKE ? " +
                "OR role LIKE ? " +
                "OR last_login LIKE ? " +
                "OR created LIKE ? " +
                "OR updated LIKE ? " +
                "ORDER BY " + data.order + " " + data.direction + " " +
                "LIMIT ?, ?"
            var data_input = ['%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', data.start, data.length]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    count: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT COUNT(*) as 'count' " +
                "FROM ms_panel_users " +
                "WHERE " +
                "username LIKE ? " +
                "OR active LIKE ? " +
                "OR role LIKE ? " +
                "OR last_login LIKE ? " +
                "OR created LIKE ? " +
                "OR updated LIKE ? " +
                "ORDER BY " + data.order + " " + data.direction
            var data_input = ['%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%', '%' + data.search + '%']
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0].count, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    addgroup: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO tr_panel_users_groups (id_users,id_groups,created,updated) " +
                "VALUES (" +
                "?, " +
                "?, " +
                "NOW(), " +
                "NOW() " +
                ")"
            var data_input = [data.id_users, data.id_groups]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getUserGroup: async function(id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM tr_panel_users_groups  " +
                "WHERE id_users=? "
            var data_input = [id_panel_users]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    selectUser: async function(username) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users " +
                "WHERE username=? "
            var data_input = [username]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    addUser: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO ms_panel_users (username,password,role,active,last_login,created,updated) " +
                "VALUES (" +
                "?, " +
                "?, " +
                "?, " +
                "1, " +
                "NOW(), " +
                "NOW(), " +
                "NOW() )"
            var data_input = [data.username, data.password, data.role]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    resetPassword: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_panel_users SET " +
                "password='" + data.password + "' " +
                "WHERE id_panel_users=" + data.id_panel_users + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deleteUserGroup: async function(id_panel_users) {
        try {
            var sql = "DELETE FROM tr_panel_users_groups WHERE id_users=" + id_panel_users + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    isActive: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_panel_users SET " +
                "active=" + data.active + " " +
                "WHERE id_panel_users=" + data.id_panel_users + " "
            console.log(sql)
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getGroups: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT id, name FROM ms_groups"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getCouponCategory: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT id_coupon_category as id,code_coupon_category as name FROM ms_coupon_category"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getPwk: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT pwk_id as id,name_pwk as name FROM ms_pwk"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getGroupsByIdUsers: async function(id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT id, name FROM ms_groups " +
                "JOIN tr_panel_users_groups ON ms_groups.id = tr_panel_users_groups.id_groups " +
                "WHERE tr_panel_users_groups.id_users = ?"
            var data_input = [id_panel_users]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getCouponGroupsByIdUsers: async function(id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT  ms_coupon_category.id_coupon_category as id, code_coupon_category as name FROM ms_coupon_category " +
                "JOIN tr_panel_users_coupon_groups ON tr_panel_users_coupon_groups.id_coupon_category = ms_coupon_category.id_coupon_category " +
                "WHERE tr_panel_users_coupon_groups.id_users = ?"
            var data_input = [id_panel_users]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getPwkGroupsByIdUsers: async function(id_panel_users){
        try {
            await mysql.connectAsync()
            var sql = "SELECT  ms_pwk.pwk_id as id, name_pwk as name FROM ms_pwk " +
                "JOIN tr_panel_users_pwk ON tr_panel_users_pwk.id_pwk = ms_pwk.pwk_id " +
                "WHERE tr_panel_users_pwk.id_users = ?"
            var data_input = [id_panel_users]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    }
}