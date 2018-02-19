var http = require('https');
var request = require('request');

module.exports = {
    checkUrl: (req, res) => {
        if (!req.query.url) {
            return res.status(400)
                .send("Parameter not found!!!");
        }
        var url = req.query.url.trim();
        //Append http if http and https is not present in query parameter
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = "http://" + url;
        }

        module.exports.sendRequest(url, 1, function (err, data) {
            if (err) {
                return res.status(400)
                    .send({
                        "error": true,
                        "message": err.message
                    });
            }
            return res.send({
                "error": false,
                "message": data
            });
        });


    },
    sendRequest: (url, count, callback) => {
        if (count > 3) {
            return callback(new Error('Website not found'));
        }
        request.head(url, function (err, response, body) {
            if (err) {
                return module.exports.sendRequest(url, count + 1, callback);
            }

            if (response && response.statusCode === 200) {
                return callback(null, "Website found");
            }

            return module.exports.sendRequest(url, count + 1, callback);
        });
    }
};