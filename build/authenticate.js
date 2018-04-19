"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@scvo/router");
var firebase = require("firebase-admin");
var FirebaseAuthRouterTask = /** @class */ (function (_super) {
    __extends(FirebaseAuthRouterTask, _super);
    function FirebaseAuthRouterTask(appConfigurations) {
        var _this = _super.call(this) || this;
        _this.name = 'firebase-auth';
        _this.apps = {};
        firebase.apps.forEach(function (app) {
            if (app) {
                _this.apps[app.name] = app;
            }
        });
        Object.keys(appConfigurations).forEach(function (appName) {
            if (!_this.apps.hasOwnProperty(appName)) {
                var config = appConfigurations[appName];
                _this.apps[appName] =
                    firebase.initializeApp({
                        credential: firebase.credential.cert(config.credential),
                        databaseURL: config.databaseURL
                    }, appName);
            }
        });
        return _this;
    }
    FirebaseAuthRouterTask.prototype.execute = function (routeMatch, task) {
        return __awaiter(this, void 0, void 0, function () {
            var config, idToken, app, decodedToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = task.config;
                        if (!routeMatch.request.cookies.hasOwnProperty(config.cookie)) {
                            throw new router_1.RouteTaskError(new Error('No authentication token provided'), {
                                data: null,
                                redirectTo: config.noCookieRoute,
                                sourceRoute: routeMatch,
                                statusCode: 403,
                                task: task
                            });
                        }
                        idToken = routeMatch.request.cookies[config.cookie];
                        app = this.apps[config.appName];
                        return [4 /*yield*/, app.auth().verifyIdToken(idToken)];
                    case 1:
                        decodedToken = _a.sent();
                        if (!decodedToken) {
                            throw new router_1.RouteTaskError(new Error('Failed to verify token'), {
                                data: null,
                                redirectTo: config.notAuthenticatedRoute,
                                sourceRoute: routeMatch,
                                statusCode: 403,
                                task: task
                            });
                        }
                        return [4 /*yield*/, app.auth().getUser(decodedToken.uid)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Failed to get user ' + decodedToken.uid);
                        }
                        console.log('User Data:', user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return FirebaseAuthRouterTask;
}(router_1.RouterTask));
exports.FirebaseAuthRouterTask = FirebaseAuthRouterTask;
//# sourceMappingURL=authenticate.js.map