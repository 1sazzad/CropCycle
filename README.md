# CropCycle

**Climate-smart crop rotation powered by NASA Earth observation data**

CropCycle is Team **NaviXor's** project for the **NASA Space Apps Challenge 2026** challenge **Field Shift: Adapting Farms with NASA Data**.

## Problem

Farmers have to decide what to plant next while rainfall patterns, heat stress, soil moisture and water availability are becoming less predictable. Earth observation data can help, but the raw data is difficult to turn into a practical field-level decision.

## Solution

CropCycle is an explainable decision-support prototype that combines:

- farm location and current crop
- soil type and season
- irrigation availability
- farmer priority
- NASA-derived climate, rainfall, soil-moisture and vegetation indicators

The system ranks candidate crops and returns:
1. recommended next crop
2. resilience/suitability score
3. simple explanation of the recommendation
4. key factor scores
5. an alternative crop
6. a suggested multi-crop rotation path

## NASA data strategy

The project is designed around:
- **NASA POWER** — temperature, precipitation, humidity and solar/climate variables
- **NASA SMAP** — soil moisture
- **NASA GPM IMERG** — precipitation/rainfall patterns
- **NASA MODIS** — vegetation and land-surface indicators

### Prototype implementation

The hackathon demo uses a lightweight, transparent rules-and-scoring model with representative NASA-derived indicators so the full user journey remains reliable during judging. The same interface is designed to be connected to live NASA APIs and geospatial services in the next implementation stage.

## Demo architecture

```
Farmer Inputs
   |
   v
Farm Context Layer
(location, crop, soil, season, irrigation, priority)
   |
   v
NASA Earth Observation Layer
POWER + SMAP + GPM IMERG + MODIS
   |
   v
Feature / Indicator Layer
heat stress, rainfall status, soil moisture,
vegetation condition, water availability
   |
   v
Crop Suitability Engine
water + soil + climate + rotation + income
   |
   v
Explainable Recommendation
next crop + score + reasons + alternative + rotation
```

## MVP features

- responsive web interface
- farm profile form
- crop recommendation engine
- resilience scoring
- rotation-aware logic
- explainable factor breakdown
- alternative crop suggestion
- NASA data-source section
- mobile-friendly presentation for judging

## Suggested judging demo

1. Open the homepage and explain the problem in 20–30 seconds.
2. Scroll to the NASA data section and explain how each source contributes.
3. Open the interactive planner.
4. Example input:
   - Region: Rajshahi / Northwest
   - Current crop: Rice
   - Soil: Loam
   - Season: Rabi
   - Priority: Use less water
   - Irrigation: Limited
5. Generate the plan.
6. Explain why the recommendation changes when priority or irrigation access changes.

## Roadmap

### Hackathon MVP
- working web prototype
- transparent recommendation engine
- NASA data mapping
- clear impact story

### Next version
- live NASA API ingestion
- map-based farm selection
- automatic geospatial feature extraction
- crop calendars and local agronomy rules
- confidence / uncertainty reporting
- Bangla interface
- farmer history and saved plans

## Team

**NaviXor**

NASA Space Apps Challenge 2026

## Repository

https://github.com/1sazzad/CropCycle
