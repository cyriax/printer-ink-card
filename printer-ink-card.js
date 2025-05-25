class PrinterInkCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this.config || !this._hass) return;

    const colors = this.config.colors || {};
    const getLevel = (color) =>
      this._hass.states[colors[color]]
        ? parseFloat(this._hass.states[colors[color]].state).toFixed(0)
        : 0;

    const levels = {
      cyan: getLevel("cyan"),
      magenta: getLevel("magenta"),
      yellow: getLevel("yellow"),
      black: getLevel("black"),
    };

    const colorMap = {
      cyan: "#008B8B",
      magenta: "#8B008B",
      yellow: "#DAA520",
      black: "#202020",
    };

    let html = `
      <ha-card>
        <style>
          ha-card {
            box-shadow: none;
            height: 100%;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
          }
          .ink-row {
            flex: 1;
            display: flex;
            padding: 1px 0;
          }
          .ink-bar {
            flex: 1;
            height: 100%;
            font-size: 0.6em;
            text-align: right;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            border-left: 1px solid rgba(0,0,0,.5);
          }
          .ink-bar.empty {
            opacity: 0.2;
          }

          .ink-bar:first-of-type {
            border-bottom-left-radius: 8px;
            border-top-left-radius: 8px;
          }

          .ink-bar.first {
            border-bottom-left-radius: 8px;
            border-top-left-radius: 8px;
          }
        </style>
    `;

    for (const [color, value] of Object.entries(levels)) {
      const bars = Math.min(10, Math.max(0, parseInt(value / 10) + 1));
      const emptyBars = 10 - bars;
      const colorStyle = `background-color: ${colorMap[color]};`;

      html += `<div class="ink-row">`;

      for (let i = 0; i < emptyBars; i++) {
        html += `<div class="ink-bar empty" style="${colorStyle}"></div>`;
      }
      for (let i = 0; i < bars; i++) {
        const isFirst = i === 0;
        html += `<div class="ink-bar${isFirst ? ' first' : ''}" style="${colorStyle}"></div>`;
      }

      html += `</div>`;
    }

    html += `</ha-card>`;
    this.innerHTML = html;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("printer-ink-card", PrinterInkCard);
