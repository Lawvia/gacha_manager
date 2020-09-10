const mysql = require('../module/mysql_connector')

module.exports = {
    getById: async function(group_id) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_groups " +
                "WHERE id=? "
            var data_input = [group_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getGroups: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_groups"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },


    addGroup: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO ms_groups (name,description,created,updated) " +
                "VALUES (" +
                "?, " +
                "?, " +
                "NOW(), " +
                "NOW() " +
                ")"
            var data_input = [data.group_name, data.description]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateGroup: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_groups SET " +
                "name=?, " +
                "description=?, " +
                "updated=NOW() " +
                "WHERE id=? "
            var data_input = [data.group_name, data.description, data.group_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
                // logs.model_log({
                //     name_function: "updateGroup",
                //     data: data,
                //     sql: sql
                // })
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deleteGroup: async function(group_id) {
        try {
            var sql = "DELETE FROM ms_groups WHERE id=? "
            var data_input = [group_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

}