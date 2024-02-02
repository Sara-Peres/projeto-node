const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())


const allOrders = []

const checkjOrder = (request, response, next) => {

    const { id } = request.params

    const index = allOrders.findIndex(order => order.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    request.orderIndex = index
    request.orderId = id

    next()
}


const checkAllOrders = (request, response, next) => {

    console.log(request.method)
    console.log(request.url)
    
    next()
}

app.get('/order/:id', checkjOrder, checkAllOrders, (request, response) => {

    const index = request.orderIndex

    return response.json(allOrders[index])
})

app.get('/order', checkAllOrders, (request, response) => {

    return response.json(allOrders)
})

app.post('/order', checkAllOrders, (request, response)=>{
   
    const { order, clientName, price, status } = request.body

    const detailOrder = { id:uuid.v4(), order, clientName, price, status}

    allOrders.push(detailOrder)

    return response.status(201).json(detailOrder)
})

app.patch('/order/:id', checkjOrder, checkAllOrders, (request, response) => {

    const index = request.orderIndex

    const id = request.orderId

    const { order, clientName, price, status} = request.body

    const updaOrder = { id, order:allOrders[index].order, clientName:allOrders[index].clientName, price: allOrders[index].price,
    status:"Pronto" }

    allOrders [index] = updaOrder

    return response.json(updaOrder)

})

app.put('/order/:id', checkjOrder, checkAllOrders, (request, response) => {

    const index = request.orderIndex

    const id = request.orderId

    const { order, clientName, price, status } = request.body

    const updaOrder = { id, order, clientName, price, status }

    allOrders[index] = updaOrder

    return response.json(updaOrder)

})

app.delete('/order/:id', checkjOrder, checkAllOrders, (request, response) => {

    const index = request.orderIndex

    allOrders.splice(index,1)

    return response.status(204).json({message: "Deleted order"})

})


app.listen(port, () => {
    console.log(`👍 Server started on port ${port}`)
})