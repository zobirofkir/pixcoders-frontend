'use client';

const RateFilter = ({ rate, onRateChange }) => {
  const handleMinChange = (e) => {
    onRateChange({
      min: parseInt(e.target.value) || 0,
      max: rate.max
    });
  };

  const handleMaxChange = (e) => {
    onRateChange({
      min: rate.min,
      max: parseInt(e.target.value) || 200
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <label className="block text-sm text-gray-500 mb-1">Min</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            name="rateMin"
            value={rate.min}
            onChange={handleMinChange}
            className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min="0"
          />
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm text-gray-500 mb-1">Max</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            name="rateMax"
            value={rate.max}
            onChange={handleMaxChange}
            className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min={rate.min}
          />
        </div>
      </div>
    </div>
  );
};

export default RateFilter;
