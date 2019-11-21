const express = require('express')
var geoip = require('geoip-lite');
const app = express()
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

const requestIp = require('request-ip');

app.get('/', (req, res) => {
    res.send(geoip.lookup(requestIp.getClientIp(req))?geoip.lookup(requestIp.getClientIp(req)):{error: 'Unable to fetch location.'});
})

app.listen(server_port, server_ip_address, () => console.log(`Example app listening on ${server_ip_address} on port ${server_port}!`))