const { searchVehicles } = require('./logic')

const { argv: [, , command] } = process

if (command === 'search') { // $ node manager search blue
    const { argv: [, , , query] } = process

    searchVehicles(query, (error, vehicles) => {
        if (error) return console.log(error.message)

        console.table(vehicles)
    })
}