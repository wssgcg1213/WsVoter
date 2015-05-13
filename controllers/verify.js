/**
 * Created by Liuchenling on 5/13/15.
 */
module.exports = verify;
function verify(req, res){
    console.log(req.body);
    return res.json({
        status: 200
    });

}