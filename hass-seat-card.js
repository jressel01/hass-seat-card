import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

function loadCSS(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

loadCSS("https://fonts.googleapis.com/css?family=Gloria+Hallelujah");

class SeatCard extends LitElement {
  constructor() {
    super();
    this.imageurl = "";
    this.config = {};
  }

  static get styles() {
    return style;
  }

  set hass(hass) {
    this._hass = hass;
    let updated = false;
  }

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  setConfig(config) {
    if (!config.device) {
      throw new Error('Please define a device (vehicle name)');
    }
    if (!config.entities) {
      throw new Error('Please define a list of entities');
    }
    this.config = config;
    if (!config.imageurl) {
      throw new Error('Please define a imageurl');
    }
    this.imageurl = this.config.imageurl;
    //this.imageurl = 'https://render.seat.de/SEA/RENDER/PRD/render/fast/H4sIAAAAAAAAAFvzloG1tIhBPNonK7EsUS8zXy84tSgzMSezKjEpJ9V63QXONcHX33oyMTBUFDAwMOTUFTFYJufn6iXn5-Wk5hfrFaXmpaQWFacWlWUmpwK15yQCBYEKcvPzoCZ5pOYUpBaphFQWpDJAgRDQtCIGPrCNOYl56XqueaW5yJIFJQwcXgGu7vE-nk4lDKwlpUVJ-XWFDHUMTCUMPGCJwFBHH8-QyOIiBkGEMZ55JanpqUVCjxYs-d7YbsHEwOjJwFqWmFOaCrROAKHOrzQ3KbWobc1UWe4pD7phfguA2cDp6-nrGh8SGeBawsCVmZuYnqqfVZCaDpPmDfB0DgkNco13DApyjCwGiXICtcvD5IWcHJ293YP8Q_1c4qFKgc40JiLU8vJSk0vyi_Q8EosznPNTYOHFyMTA6snAVG4IIoxAhDGIMAERphUFxSu8tj6_JK3G3GF79qOBXaf6G_PCEga29Jz8pMQcmKPYYS4B8UWOCT1uervuzpWPdlfEfjFdr6gU3jmxhIHPx9XfLz7YOd7URTe1ogSkUhyi_vqpwL0Wjzp2J225e166PCbW5EjyxxIGboj6EDTFsiwlnSXpiuwMOicbBFg_5sxfwLUQJCGDpCYtckqRzP-75zu5bod-tDse2r7MoQRdTe_f5AtSgRvfOPMnHj6_IPHS9iCWDHQ1W-MOhjgHnvsz3802-kR-lqx8C8dVdDUGvLpNrzbL9sm_-hv-e_6FFZYt7wTR1dyV9jCzF_q7uK3h9Pmb10wmTtoeloau5tfqrK3bc9yiXI5uW686h2nv-Z8L56CrYb3P_2DNwT0sxW8ftDKKKv94zTWfDSQhhRyYd2asC2R7smhe-myR-ilR6i8zuJejm_NHsFeyl_-MjY7n30nTIy8JTrs2_RK6mg8Z1rMnGKe_W_5J-pFAy79Ne7-FYYThrHczGLMud0Q95siO2Z2673bJ7E4VdDU_7EKVdC-KcAlZnr4wT7U5vXDvwWZ0NYaLNSZ_Pxkd0c4oZM4p17JlbrzRc1gCiAiAJwAQoQUitLFxIUZ5tLsnKDs7Z0vFv7zq-bbJ7DZz2kF06-JYJobtkHOZ9I_7_i2t0llT2s5PnIyuZo6lkxYbb-7Jedob_KQdjOfrmorcxIiO0-e1rs-J-jo9Nkz1Vd7sEyH_zguhq7k09bt14Mc_qmyBiyNap62uLY3gDMTwfmrInVMsLVJOa8wWSzzkzmWbK3UdXc3nkqmigrMvfA3drPapU6193rc5ZiboanbeeG51TS7picc8Sf65B1a8rLyq6oeuZm3sNO4_k6-s5oneFtqvzFAY_WJxHLqaXfxOKpy1sT8n9Mt92Z4bxsVSaMOKrkYsv81n9bdGA-7L2vUPuAUmewQ6-qOruf1D96vIvFnu704Ezrg375vzioRNdmA1sGKDJdgzyhVWxLEywFhMF1ALXqf8_JzUxLyzCkUNV-f8egcseKNgBW8BXBMDA7yADQ3yiQ9wDHL0BRY6pUU5BYlFibl65ZkpJRkAgsH255AGAAA';
  }

  render(){
    return html`
      <ha-card>
        ${this.renderContainer()}
      </ha-card>
    `;
  }

  renderContainer() {
    return html `
      <div class="seat-container">
        ${this.renderBackground()} ${this.renderHeader()} ${this.renderStates()}
      </div>
    `
  }

  renderHeader() {
    return html `
      ${this.config.title == null || this.config.title == true
      ? html`
        <div class="seat-header">
          <div class="name">
            ${this.header}
          </div>
        </div>`
      : "" }
    `;
  }

  renderBackground() {
    return html `
      <img class="seat-model" src="${this.imageurl}">
    `
  }

  // stateObj props:
  //   entity-id
  //   state
  //   attributes
  //    model
  //    unit_of_measurement
  //    friendly_name
  //    icon
  //    assumed_state
  //   last_changed
  //   last_updated
  //   context
  renderStates() {
    return html `
      <div class="seat-footer">
      ${this.config.entities.map(ent => {
        const stateObj = this._hass.states[ent];
        return stateObj
          ? this.renderEntity(stateObj)
          : html`
              <div class="not-found">Entity ${ent} not found.</div>
            `;
      })}
      </div>
    `
  }

  renderEntity(entity) {
    var iconstate = "off";
    if (entity.state === "on") {
      iconstate = "on";
    }
    return html`
      <div class="seat-state">
        <div class="seat-state-icon">
          ${this.renderIcon(entity)}
          <span class="tooltip">${entity.attributes.friendly_name}</span>
        </div>
        ${this.config.states == true
          ? html `
            <div class="seat-state-text">
              ${entity.state} ${entity.attributes.unit_of_measurement || ""}
            </div>`
          : ""
        }
      </div>
    `;
  }


  //.overrideIcon="${config.icon === true ? entity.attributes.icon || null : config.icon}"
  //.stateColor="${config.state_color}"
  renderIcon(entity) {
    return html`<state-badge
      class="icon-small"
      .stateObj="${entity}"
      .stateColor="true"
    ></state-badge>`;
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }

  getIcon(entity) {
    return (
      this.config.icon || entity.attributes.icon
    );
  }

  static get styles() {
    return css`
      .seat-container {
        position: relative;
      }

      .seat-model {
        display: block;
        max-width: 100%;
        padding-top: 30px;
        padding-bottom: 20px;
      }

      .seat-header {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 10px;
        text-align: center;
        font-size: 24px;
      }

      .seat-state {
        height: 100%;
        width: 50px;
        margin: 0px 5px;
      }

      .seat-state-icon {
        position: relative;
        display: inline-block;
        color: var(--paper-item-icon-color, #44739e);
        max-width: 100%;
        margin: 0px;
        padding: 3px 0px 2px;
      }
      .seat-state-icon .tooltip {
        visibility: hidden;
        width: 120px;
        background-color: var(--ha-picture-card-background-color, rgba(0, 0, 0, 0.9));
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
      }
      .seat-state-icon:hover .tooltip {
        visibility: visible;
      }

      p.seat-state-text {
        margin: 5px 0px;
        padding: 0px;
      }

      .seat-footer {
        position: absolute;
        bottom: 0px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-evenly;
        width: 100%;
        height: 50px;
        background-color: var(--primary-background-color);
        opacity: 60%;
      }
    `;
  }
}

customElements.define('seat-card', SeatCard);
