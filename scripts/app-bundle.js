define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/tweet-service', './services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweetService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('tweet');
          });
        } else {
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
        function Home(au) {
            _classCallCheck(this, Home);

            this.aurelia = au;
        }

        Home.prototype.configureRouter = function configureRouter(config, router) {
            config.map([{ route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Your Timeline' }, { route: 'globalTimeline', name: 'globalTimeline', moduleId: 'viewmodels/globalTimeline/globalTimeline', nav: true, title: 'Global Timeline' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
            this.router = router;

            config.mapUnknownRoutes(function (instruction) {
                return 'home';
            });
        };

        return Home;
    }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _fixtures2 = _interopRequireDefault(_fixtures);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default), _dec(_class = function () {
        function AsyncHttpClient(httpClient, fixtures) {
            _classCallCheck(this, AsyncHttpClient);

            this.http = httpClient;
            this.http.configure(function (http) {
                http.withBaseUrl(fixtures.baseUrl);
            });
        }

        AsyncHttpClient.prototype.get = function get(url) {
            return this.http.get(url);
        };

        AsyncHttpClient.prototype.post = function post(url, obj) {
            return this.http.post(url, obj);
        };

        AsyncHttpClient.prototype.delete = function _delete(url) {
            return this.http.delete(url);
        };

        return AsyncHttpClient;
    }()) || _class);
    exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Fixtures = function Fixtures() {
        _classCallCheck(this, Fixtures);

        this.baseUrl = 'https://sheltered-atoll-65815.herokuapp.com/';
    };

    exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
        _classCallCheck(this, LoginStatus);

        this.status = status;
    };
});
define('services/tweet-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator, _asyncHttpClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _fixtures2 = _interopRequireDefault(_fixtures);

    var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var TweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
        function TweetService(data, ea, ac) {
            _classCallCheck(this, TweetService);

            this.users = [];
            this.tweets = [];
            this.userTweets = [];
            this.loggedInUser = null;

            this.ea = ea;
            this.ac = ac;
            this.getTweets();
            this.getUsers();
        }

        TweetService.prototype.getTweets = function getTweets() {
            var _this = this;

            this.ac.get('/api/tweets').then(function (res) {
                _this.tweets = res.content;
            });
        };

        TweetService.prototype.getUsers = function getUsers() {
            var _this2 = this;

            this.ac.get('/api/users').then(function (res) {
                _this2.users = res.content;
            });
        };

        TweetService.prototype.getUserTweets = function getUserTweets() {
            var _this3 = this;

            this.ac.get('/api/tweetsUser/' + this.loggedInUser._id).then(function (res) {
                _this3.userTweets = res.content;
            });
        };

        TweetService.prototype.login = function login(email, password) {
            var status = {
                success: false,
                message: ''
            };

            for (var _iterator = this.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var user = _ref;

                if (user.email === email && user.password === password) {
                    status.success = true;
                    status.message = 'logged in';
                    this.loggedInUser = user;
                    this.getUserTweets();
                }
            }
            this.ea.publish(new _messages.LoginStatus(status));
        };

        TweetService.prototype.register = function register(firstName, lastName, userName, email, password) {
            var _this4 = this;

            var newUser = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                description: "Hi, I'm new to Tweets and this is my profile",
                email: email,
                password: password,
                profileImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAyCAIAAAClJN76AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QwTETULvpeljgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANJSURBVFjD7ZffShtBFMZnZnfdmARNoDQQ+yc10VqwjVChhWqU+ARC9LYXfahCX0Bv1CuxRFFBLVWSgjUaDQ01MVHBGOIqm83OzkwvpKHGZKPJbhXac7ews7/5vjl75hz48dMpuLtA4E6Db2CNJFFCQCqt2Wzo+Ji43VwuR10PkcfDm4jPZMnhIYlE1Nwpubhg11/wPOX7+1vcbu5RB2ckPn1AYjH1+xYuFCilNV/bT2npA83hQK9eCr29LU8ec83ii0X2I6ktLyuHR4SQ+hulFOTzdGW1lExqw8MWn5dvbYUNpl6xyCJRdWpaPsjciF0OQsBBhkxNy5GoWiyyRtQXi2x1rbS0XNI01lhWyzKb+6woCht4J9byoKb69Q11cUlpmH0ZmsYWl5T1DfV25kejanheuZXhOgcRnleiUfWmeEmi4YVmdVd4EF5QJIneCD87pxQK1NjqVijQ2TmlPj6TJYkEZsxYOmAMJBI4kyV18PE4lmWj4b9/hHgc18HHto2XXjYgtq2LlySaz1NgWuTztCIBr+LPGcbMPDzGTDpneuqpieIBpUBPvSF1pm4V0sEz8/HsHjVbV/D6d7MhUYG4gnc4TDejAnHlwelAFtFEAywidOrgBQE20K3ePDweXhBqmw8h6PMLyJwTQAj0+QUIdWu+z8e7XJwZeJeL8/n4OleO3Y5GghbDDUAIjAQtdjuqg0cIdHfxXq/BGeD18t1d/HVVVWSKIhwPWQ38BSwiHA9ZxWofrIKHELS1oWDQAo3YAIQgGLS0taGqX0O11gwFRG+nAUfg7eSHAmItJUhn12Mhq83WlAM2GxwLWXVc1EtxpxMFBsVm8IFB0elEjc94qVRTLUAqRfRnvJr4dFqbmpb3ErgZ/F4CT03L6bR2ixGTEPBzX5uZkXOntMmulxCwFcNHR2R01PrMw3NcPfWEgJ04npiUT3LUkI6bMXCSoxOT8k4cX2/m+D/7wLMzurJa+rquGjjgXcb5OZ2YlN++aRkcENvbUbn88Zcb3N3Dm5s4vosVhZk0ZmgaW/tSin5TX/QIfr/Q81yAEMD3Hw4jUZzNan+hzS0Hx4GODr7/tQDbHyRN7e31r0F0V+zLbLtPjfZ//H/8P4P/BaUljmJ8GjTRAAAAAElFTkSuQmCC",
                follows: []
            };

            this.ac.post('/api/users', newUser).then(function (res) {
                _this4.getUsers();
            });
        };

        TweetService.prototype.postTweet = function postTweet(text) {
            var _this5 = this;

            var date = new Date();
            var formattedDate = date.toDateString();
            var tweet = {
                author: null,
                text: text,
                date: date,
                formattedDate: formattedDate,
                postedImage: ""
            };

            this.ac.post('/api/tweets', { tweet: tweet, user: this.loggedInUser }).then(function (res) {
                var returnedTweet = res.content;
                _this5.tweets.push(returnedTweet);
            });
        };

        TweetService.prototype.deleteTweet = function deleteTweet(id) {
            var _this6 = this;

            this.ac.delete('/api/tweets/' + id).then(function (res) {
                _this6.getTweets();
                _this6.getUserTweets();
            });
        };

        TweetService.prototype.logout = function logout() {
            var status = {
                success: false,
                message: ''
            };
            this.loggedInUser = null;
            this.userTweets = null;
            this.ea.publish(new _messages.LoginStatus(status));
        };

        return TweetService;
    }()) || _class);
    exports.default = TweetService;
});
define('viewmodels/globalTimeline/globalTimeline',["exports", "aurelia-framework", "../../services/tweet-service"], function (exports, _aureliaFramework, _tweetService) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GlobalTimeline = undefined;

    var _tweetService2 = _interopRequireDefault(_tweetService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var GlobalTimeline = exports.GlobalTimeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function GlobalTimeline(ts) {
        _classCallCheck(this, GlobalTimeline);

        this.tweets = [];

        this.tweetService = ts;
        this.tweets = ts.tweets;
    }) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.tweetService = ts;
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/profile/profile',["exports", "aurelia-framework", "../../services/tweet-service"], function (exports, _aureliaFramework, _tweetService) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Profile = undefined;

    var _tweetService2 = _interopRequireDefault(_tweetService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Profile = exports.Profile = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function Profile(ts) {
        _classCallCheck(this, Profile);

        this.user = null;

        this.user = ts.user;
    }) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(ts) {
      _classCallCheck(this, Logout);

      this.tweetService = ts;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.tweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.userName = 'margeS';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.tweetService = ts;
    }

    Signup.prototype.register = function register(e) {
      this.tweetService.register(this.firstName, this.lastName, this.userName, this.email, this.password);
      this.tweetService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/tweet/tweet',["exports", "aurelia-framework", "../../services/tweet-service"], function (exports, _aureliaFramework, _tweetService) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tweet = undefined;

    var _tweetService2 = _interopRequireDefault(_tweetService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
        function Tweet(ts) {
            _classCallCheck(this, Tweet);

            this.text = "Hello World";
            this.tweets = [];
            this.user = null;
            this.selectedOption = {};

            this.tweetService = ts;
            this.tweets = ts.userTweets;
            this.user = ts.user;
            this.selectedOption = this.tweets[0];
        }

        Tweet.prototype.postTweet = function postTweet() {
            this.tweetService.postTweet(this.text, this.user);
        };

        Tweet.prototype.deleteTweet = function deleteTweet() {
            this.tweetService.deleteTweet(this.selectedOption._id);
            this.tweets = this.deleteTweettweetService.userTweets;
            this.selectedOption = this.tweets[0];
        };

        return Tweet;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui grid container page-host\"><section class=\"ui sixteen wide column\"><nav-bar router.bind=\"router\"></nav-bar></section><section class=\"ui sixteen wide column\"><router-view></router-view></section></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui grid container page-host\"><section class=\"ui sixteen wide column\"><nav-bar router.bind=\"router\"></nav-bar></section><section class=\"ui sixteen wide column\"><router-view></router-view></section></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui menu\"><header class=\"header item\"><a href=\"/\">Tweets</a></header><div class=\"right menu\"><a repeat.for=\"row of router.navigation\" class=\"${row.isActive ?'active':''} item\" href.bind=\"row.href\">${row.title}</a></div></nav></template>"; });
define('text!viewmodels/globalTimeline/globalTimeline.html', ['module'], function(module) { module.exports = "<template><section class=\"ui raised segment\"><div class=\"ui divided items\"><div repeat.for=\"tweet of tweets\" class=\"item\"><div class=\"ui tiny image\"><img src=\"${tweet.author.profileImage}\"></div><div class=\"content\"><div class=\"header\"><label> ${ tweet.author.firstName } ${ tweet.author.lastName } </label><div class=\"meta\">@${ tweet.author.userName } | ${ tweet.formattedDate }</div><div class=\"description\"><p>${ tweet.text }</p></div><div class=\"extra\"><div class=\"ui large bordered image\"><img src=\"${ tweet.postedImage }\"></div></div></div></div></div></div></section></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><form submit.trigger=\"login($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Log-in</h3><div class=\"field\"><label>Email</label><input placeholder=\"Email\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Login</button><h3>${prompt}</h3></form></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui blue submit button\">Logout</button></form></template>"; });
define('text!viewmodels/profile/profile.html', ['module'], function(module) { module.exports = "<template><div class=\"ui four wide column\"><section class=\"ui card\"><div class=\"image\"><img src.bind=\"user.profileImage\"></div><div class=\"content\"><div class=\"header\"> ${user.firstName} ${user.lastName} </div><div class=\"meta\"><span>@${user.userName}</span></div><div class=\"description\"><p> ${user.description} </p></div></div></section></div></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><form submit.trigger=\"register()\" class=\"ui stacked fluid form segment\"><h3 class=\"ui header\">Register</h3><div class=\"two fields\"><div class=\"field\"><label>First Name</label><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"userName\"></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Submit</button></form></template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template><form submit.trigger=\"postTweet()\" class=\"ui form raised segment\"><div class=\"field\"><label>Tweet to all your friends:</label><textarea rows=\"3\" value.bind=\"text\"></textarea></div><button class=\"ui blue submit button\">Tweet</button></form><form submit.trigger=\"deleteTweet()\" class=\"ui form raised segment\"><label>Your latest Tweets:</label><button type=\"submit\" class=\"ui submit button\">Delete Selected</button><div class=\"ui divided items\"><div repeat.for=\"tweet of tweets\" class=\"item\"><div class=\"ui tiny image\"><img src=\"${tweet.author.profileImage}\"></div><div class=\"content\"><div class=\"header\"><input type=\"radio\" name=\"tweets\" model.bind=\"tweet\" checked.bind=\"$parent.selectedOption\"><label> ${ tweet.author.firstName } ${ tweet.author.lastName } </label></div><div class=\"meta\">@${ tweet.author.userName } | ${ tweet.formattedDate }</div><div class=\"description\"><p>${ tweet.text }</p></div><div class=\"extra\"><div class=\"ui medium bordered image\"><img src=\"${tweet.postedImage}\"></div></div></div></div></div></form></template>"; });
//# sourceMappingURL=app-bundle.js.map