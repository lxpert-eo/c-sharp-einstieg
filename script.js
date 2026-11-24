document.addEventListener('DOMContentLoaded', function () {
  var btns = document.querySelectorAll('.nav-btn');
  var tabs = document.querySelectorAll('.tab-content');
  var content = document.querySelector('.content-area');

  function toTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (content) { content.scrollTop = 0; }
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-tab');
      if (!id) { return; }
      btns.forEach(function (b) { b.classList.remove('active'); });
      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      document.getElementById('tab-' + id).classList.add('active');
      toTop();
      window.requestAnimationFrame(toTop);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tracer').forEach(function (box) {
    var data = JSON.parse(box.getAttribute('data-steps'));
    var cur = -1;
    var table = box.querySelector('.tracer-table');
    var note = box.querySelector('.tracer-note');
    var back = box.querySelector('.tr-back');
    var next = box.querySelector('.tr-next');
    var reset = box.querySelector('.tr-reset');
    var count = box.querySelector('.tr-count');
    function render() {
      box.querySelectorAll('.tl').forEach(function (el) { el.classList.remove('on'); });
      if (cur >= 0) {
        var line = box.querySelector('.tl[data-l="' + data.steps[cur].l + '"]');
        if (line) { line.classList.add('on'); }
      }
      var h = '<table><tr><th>Schritt</th>';
      data.vars.forEach(function (v) { h += '<th>' + v + '</th>'; });
      h += '</tr>';
      for (var i = 0; i <= cur; i++) {
        h += '<tr' + (i === cur ? ' class="cur"' : '') + '><td>' + (i + 1) + '</td>';
        data.vars.forEach(function (v) {
          var val = data.steps[i].v[v];
          h += '<td>' + (val === undefined ? '' : val) + '</td>';
        });
        h += '</tr>';
      }
      h += '</table>';
      table.innerHTML = cur >= 0 ? h : '';
      note.textContent = cur >= 0 ? data.steps[cur].n : 'Klicke auf Weiter. Die markierte Zeile wird als nächste ausgeführt.';
      back.disabled = cur < 0;
      next.disabled = cur >= data.steps.length - 1;
      count.textContent = (cur + 1) + ' von ' + data.steps.length;
    }
    next.addEventListener('click', function () { if (cur < data.steps.length - 1) { cur++; render(); } });
    back.addEventListener('click', function () { if (cur >= 0) { cur--; render(); } });
    reset.addEventListener('click', function () { cur = -1; render(); });
    render();
  });
});
