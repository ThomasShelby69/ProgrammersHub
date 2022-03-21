const router = require("express").Router();
const { route } = require("express/lib/application");
const passport = require("passport");

router.get("/", passport.authenticate("discord"));
router.get(
    "/redirect",
    passport.authenticate("discord", {
        failureRedirect: "/",
        successRedirect: '/dashboard'
    }),
    (req, res) => {
        res.send(200);
    }
);
router.get("/logout", (req,res)=>{
    if(req.user){
        req.logout();
        res.redirect('/');
    }else{
        res.redirect('/');
    }
});

function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/");
    }
}
module.exports = router;
