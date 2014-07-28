var sk = require('scikit-node');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var xTrain;
var yTrain = [];
var xValid;

var run = function(req, res){
    var alg = req.params.id;
    if(alg === 'RandomForestClassifier'){
        sk.randomForestClassifier([['fit', xTrain, yTrain],['predict', xValid]], function(data){
            res.send(data);
        }, [12]);
    } else if (alg === 'GradientBoostingClassifier'){
        sk.gradientBoostingClassifier([['fit', xTrain, yTrain],['predict', xValid]], function(data){
            res.send(data);
        });
    }
            // raw use of skLearn function. Can construct methods for algorithms on top though.
            // sk.skLearn('ensemble', ['RandomForestClassifier', 1], [['fit', xTrain, yTrain],['predict', xValid]], function(data){
            //     res.send(data);
            // });
            // Module did not work when I tried to demo with logisticRegression, but RFC and GBC worked fine.
};

exports.skLaunch= function(req, res){
    if(xTrain){
        run(req, res);
    } else{
        fs.readFileAsync(__dirname + '/../data/training.csv').then(function(data){
            data = data.toString();
            return data.split('\n');
        }).then(function(X){
            xTrain = X.slice(1,125);
            xTrain.forEach(function(row, i){
                xRow = row.split(',');
                y = xRow.pop();
                if(y === 's'){
                    yTrain.push(1);
                } else if (y === 'b'){
                    yTrain.push(0);
                } else{
                    console.log('invalid input');
                }
                xRow.pop();
                xRow.shift();
                xTrain[i] = xRow;
            });
            return X;
        }).then(function(X){
            xValid = X.slice(126, 150);
            xValid.forEach(function(row, i){
                xRow = row.split(',');
                xRow.pop();
                xRow.pop();
                xRow.shift();
                xValid[i] = xRow;
            });
        }).then(function(){
            run(req, res);
        });
    }
};
