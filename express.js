const express = require('express')
const app = express();
app.use(express.json())

app.listen(3000, function () {
    console.log('App on port 3000')
})
let output = {}

app.get('/:operation', (req, res) => {
    output['operation'] = req.params.operation
    let nums = Array(req.query.nums)
    //checks if input exists
    if (nums[0] == undefined) {
        return res.status(400).json('nums are required')
    }
    //splits string in array into parts separated by comma
    nums = nums[0].split(',')
    //checks those parts are all numbers
    if (nums.every((n) => {
        //borrowed regex from stackoverflow
        return /^-?\d+$/.test(n)
    })) {
        process(nums)
        res.json(output)
    }
    else { return res.status(400).json('Only enter numbers') }
})

function process(nums) {
    //makes all numbers floats so decimals show
    nums.forEach((n) => {
        nums[nums.indexOf(n)] = parseFloat(n)
    })

    if (output.operation == 'all') {
        mean(nums)
        median(nums)
        mode(nums)
        return
    }
    else if (output.operation == "mean") {
        mean(nums)
        return
    } else if (output.operation == 'median') {
        median(nums)
        return
    } else {
        mode(nums)
        return
    }

}

function mean(nums) {
    let avg = nums.reduce((sum, n) => {
        return sum + n
    }, 0) / nums.length
    output.operation == "all" ? output['mean'] = avg : output['value'] = avg
    return
}
function median(nums) {
    nums.sort((a, b) => { return a - b })
    medianout = nums[Math.ceil(nums.length / 2) - 1]
    if (nums.length % 2 != 0) {
        output.operation == "all" ? output['median'] = medianout : output['value'] = medianout
        return
    } else {
        let avg = (medianout + nums[nums.length / 2]) / 2
        output.operation == "all" ? output["median"] = avg : output['value'] = avg
        return
    }
}
function mode(nums) {
    //mode reduce function from Stack overflow
    let mode = nums.reduce(
        (a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
        null)
    output.operation == "all" ? output['mode'] = mode : output['value'] = mode
    return
}