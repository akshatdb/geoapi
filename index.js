const express = require('express');
var geoip = require('geoip-lite');
const app = express();
const helmet = require('helmet');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

const requestIp = require('request-ip');
app.use(helmet());
app.use(cors())
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(requestIp.getClientIp(req));
    res.send(geoip.lookup(requestIp.getClientIp(req))?geoip.lookup(requestIp.getClientIp(req)):{error: 'Can not fetch location for a private IP'});
})

app.listen(server_port, server_ip_address, () => console.log(`Example app listening on ${server_ip_address} on port ${server_port}!`));
