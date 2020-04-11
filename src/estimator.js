const covid19ImpactEstimator = (data) => {
  function estimateImpactCurrentlyInfectedPeople() {
    const { reportedCases } = data;
    return reportedCases * 10;
  }
  function estimateSevereImpactCurrentlyInfectedPeople() {
    const { reportedCases } = data;
    return reportedCases * 50;
  }

  function calculateInfections(time, currentlyInfectedPeople) {
    const days = Math.trunc(time / 3);
    return currentlyInfectedPeople * (2 ** days);
  }

  function changePeriodType(periodType, timeToElapse) {
    if (periodType === 'days') {
      return timeToElapse;
    } if (periodType === 'weeks') {
      return timeToElapse * 7;
    }
    return timeToElapse * 30;
  }
  function infectionsByRequestedTime(whichImpact) {
    const { timeToElapse, periodType } = data;
    let time;
    if (whichImpact === 'impact') {
      if (periodType === 'days') {
        return calculateInfections(timeToElapse, estimateImpactCurrentlyInfectedPeople());
      } if (periodType === 'months') {
        time = timeToElapse * 30;
        return calculateInfections(time, estimateImpactCurrentlyInfectedPeople());
      } if (periodType === 'weeks') {
        time = timeToElapse * 7;
        return calculateInfections(time, estimateImpactCurrentlyInfectedPeople());
      }
    } else if (whichImpact === 'severeImpact') {
      if (periodType === 'days') {
        return calculateInfections(timeToElapse,
          estimateSevereImpactCurrentlyInfectedPeople());
      } if (periodType === 'months') {
        time = timeToElapse * 30;
        return calculateInfections(time, estimateSevereImpactCurrentlyInfectedPeople());
      } if (periodType === 'weeks') {
        time = timeToElapse * 7;
        return calculateInfections(time, estimateSevereImpactCurrentlyInfectedPeople());
      }
    }
    return 'Period type Must be months, days, or week';
  }

  function severeCases(whichImpact) {
    return Math.trunc((15 / 100) * infectionsByRequestedTime(whichImpact));
  }

  function hospitalBeds(whichImpact) {
    const { totalHospitalBeds } = data;
    const availableBedPercentage = (35 / 100) * totalHospitalBeds;
    return Math.trunc(availableBedPercentage - severeCases(whichImpact));
  }

  function casesForIcu(whichImpact) {
    return Math.trunc((5 / 100) * infectionsByRequestedTime(whichImpact));
  }

  function casesForVentilators(whichImpact) {
    return Math.trunc((2 / 100) * infectionsByRequestedTime(whichImpact));
  }

  function flightDollars(whichImpact) {
    const dailyIncomeUsd = data.region.avgDailyIncomeInUSD;
    const dailyIncomePopulation = data.region.avgDailyIncomePopulation;
    const { timeToElapse, periodType } = data;
    const result = (infectionsByRequestedTime(whichImpact) * dailyIncomeUsd
            * dailyIncomePopulation) / changePeriodType(periodType, timeToElapse);
    return Math.trunc((result * 100) / 100);
  }
  return {
    data,
    impact: {
      currentlyInfected: estimateImpactCurrentlyInfectedPeople(),
      infectionsByRequestedTime: infectionsByRequestedTime('impact'),
      severeCasesByRequestedTime: severeCases('impact'),
      hospitalBedsByRequestedTime: hospitalBeds('impact'),
      casesForICUByRequestedTime: casesForIcu('impact'),
      casesForVentilatorsByRequestedTime: casesForVentilators('impact'),
      dollarsInFlight: flightDollars('impact')
    },
    severeImpact: {
      currentlyInfected: estimateSevereImpactCurrentlyInfectedPeople(),
      infectionsByRequestedTime: infectionsByRequestedTime('severeImpact'),
      severeCasesByRequestedTime: severeCases('severeImpact'),
      hospitalBedsByRequestedTime: hospitalBeds('severeImpact'),
      casesForICUByRequestedTime: casesForIcu('severeImpact'),
      casesForVentilatorsByRequestedTime: casesForVentilators('severeImpact'),
      dollarsInFlight: flightDollars('severeImpact')
    }

  };
};

module.exports = covid19ImpactEstimator;
