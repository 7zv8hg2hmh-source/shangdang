window.Game = window.Game || {};

Game.AnalyticsConfig = {
  supabaseUrl: "https://eslyhcmmnfzhsndeklda.supabase.co",
  anonKey: "sb_publishable_1Dpr9NEbpaF57t9LlNmlig_AOLwdv1U"
};

Game.AnalyticsSystem = {
  visitorKey: "shangdang_visitor_id",
  sessionKey: "shangdang_session_id",
  heartbeatTimer: null,

  init: function() {
    this.render({ online: "--", today: "--", total: "--" });
    if (!this.isConfigured()) {
      this.setStatus("等待配置 Supabase anon key");
      return;
    }
    this.startSession();
  },

  isConfigured: function() {
    var cfg = Game.AnalyticsConfig || {};
    return !!(cfg.supabaseUrl && cfg.anonKey && cfg.anonKey.indexOf("PASTE_") !== 0);
  },

  getVisitorId: function() {
    var id = localStorage.getItem(this.visitorKey);
    if (!id) {
      id = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(this.visitorKey, id);
    }
    return id;
  },

  startSession: function() {
    var self = this;
    this.rpc("start_game_session", { p_visitor_id: this.getVisitorId() })
      .then(function(data) {
        if (data && data.session_id) localStorage.setItem(self.sessionKey, data.session_id);
        self.render(data);
        self.startHeartbeat();
      })
      .catch(function() {
        self.setStatus("统计连接失败");
      });
  },

  startHeartbeat: function() {
    var self = this;
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(function() {
      self.sendHeartbeat();
    }, 30000);
  },

  sendHeartbeat: function() {
    var self = this;
    var sessionId = localStorage.getItem(this.sessionKey);
    if (!sessionId) {
      this.startSession();
      return;
    }
    this.rpc("heartbeat_game_session", { p_session_id: sessionId })
      .then(function(data) {
        self.render(data);
      })
      .catch(function() {
        self.rpc("get_game_analytics", {}).then(function(data) {
          self.render(data);
        });
      });
  },

  rpc: function(name, body) {
    var cfg = Game.AnalyticsConfig;
    return fetch(cfg.supabaseUrl.replace(/\/$/, "") + "/rest/v1/rpc/" + name, {
      method: "POST",
      headers: {
        "apikey": cfg.anonKey,
        "Authorization": "Bearer " + cfg.anonKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body || {})
    }).then(function(res) {
      if (!res.ok) throw new Error("analytics rpc failed");
      return res.json();
    });
  },

  render: function(data) {
    var el = document.getElementById("analytics-strip");
    if (!el) return;
    data = data || {};
    el.innerHTML =
      '<span title="最近2分钟有心跳的玩家">在线 <strong>' + this.value(data.online) + '</strong></span>' +
      '<span title="按北京时间统计今天打开游戏的人次">今日 <strong>' + this.value(data.today) + '</strong></span>' +
      '<span title="历史累计打开游戏的人次">总计 <strong>' + this.value(data.total) + '</strong></span>';
  },

  value: function(v) {
    if (v === null || typeof v === "undefined") return "--";
    var number = Number(v);
    return Number.isFinite(number) ? number.toLocaleString("zh-CN") : "--";
  },

  setStatus: function(text) {
    var el = document.getElementById("analytics-strip");
    if (!el) return;
    el.innerHTML = '<span class="analytics-muted">' + text + '</span>';
  }
};
