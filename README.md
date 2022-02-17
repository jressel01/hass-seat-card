# Seat Connect card
Home Assistant Lovelace UI card for Seat Connect integration

This card creates a pretty (up for discussion) card for your Seat car status.

## Configuration

### General

| Name | Type | Required | Default | Description
| ---- | ---- | -------- | ------- | -----------
| type | string | True | - | Must be "custom:seat-card"
| title | string | False | - | Title of the card

### Device
| Name | Type | Required | Default | Description
| ---- | ---- | -------- | ------- | -----------
| device | string | True | - | The name of the device

Choose the device corresponding to the vehicle you want to display.
The card assumes that the default sensor names are used and might not work if the entities have been renamed.

### Sample

```yaml
type: custom:seat-card
title: My car
device: Seat
imageurl: http://aba/seat.jpg
entities:
  - lock.fin_door_locked
```
