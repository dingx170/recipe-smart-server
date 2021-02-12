import {Router} from "express";

class TempPageRoute {

    public static registerRoutes(pageRoute: Router) {
        
        pageRoute.get('/index', (req, res) => res.render('index'));
    }
}

export {TempPageRoute}