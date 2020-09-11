const mysql = require('../module/mysql_connector')
const passport = require('../module/passport')
module.exports = {

    get: async function(username) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users WHERE username=? ";
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

    byid: async function(id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users WHERE id_panel_users=? ";
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

    updatePass: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_panel_users SET " +
                "password=?, " +
                "updated=NOW() " +
                "WHERE id_panel_users=? "
            var data_input = [data.password, data.id_panel_users]
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