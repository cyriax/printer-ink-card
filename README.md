# PrinterInk Card

A simple Lovelace card to show ink levels.

![image](https://github.com/user-attachments/assets/0ebe2710-09f1-4dcd-abde-d609780ec218)


## Installation via HACS

1. Go to HACS → Frontend → Custom Repositories
2. Add `https://github.com/cyriax/printer-ink-card` as a **Lovelace** type
3. Install the card and reload resources

## Manual Installation

1. Download `printer-ink-card.js`
2. Place it in `config/www/`
3. Add to `configuration.yaml` or via UI:

```yaml
resources:
  - url: /local/printer-ink-card.js
    type: module
```

## Usage

```yaml
type: custom:printer-ink-card
entity: sensor.mfc_j5320dw_status
colors:
  cyan: sensor.cyan_ink_tank
  magenta: sensor.magenta_ink_tank
  yellow: sensor.yellow_ink_tank
  black: sensor.black_ink_tank
```
