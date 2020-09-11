const mysql = require('../module/mysql_connector')

module.exports = {
    getById: async function(genre_id) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_genre " +
                "WHERE id=? "
            var data_input = [genre_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getGenres: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_genre"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },


    addGenre: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO ms_genre (name,created,updated) " +
                "VALUES (" +
                "?, " +
                "NOW(), " +
                "NOW() " +
                ")"
            var data_input = [data.genre_name]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateGenre: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_genre SET " +
                "name=?, " +
                "updated=NOW() " +
                "WHERE id=? "
            var data_input = [data.genre_name, data.genre_id]
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

    deleteGenre: async function(group_id) {
        try {
            var sql = "DELETE FROM ms_genre WHERE id=? "
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