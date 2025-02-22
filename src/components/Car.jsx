import events from "../data/log.json";

function Car() {
  // date formatting to german format
  function formatDateToGerman(dateString) {
    return new Date(dateString).toLocaleDateString("de-DE");
  }

  // Sort events by timestamp before rendering
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // counter for total events
  const totalEvents = sortedEvents.length;

  // get finally valid reservations by name beside cancellations
  function getFinalRentals(logData) {
    const reservationMap = new Map();
    const cancellations = [];
  
    logData.forEach((entry) => {
      const key = `${entry.name}-${entry["start-date"]}-${entry["end-date"]}`;
  
      if (entry.action === "reservation") {
        reservationMap.set(key, {
          name: entry.name,
          startDate: entry["start-date"],
          endDate: entry["end-date"],
          timestamp: entry.timestamp
        });
      } else if (entry.action === "cancelation") {
        cancellations.push({
          name: entry.name,
          startDate: entry["start-date"],
          endDate: entry["end-date"],
          timestamp: entry.timestamp
        });
        reservationMap.delete(key);
      }
    });
  
    const activeRentals = Array.from(reservationMap.values()).sort((a, b) =>
      a.startDate.localeCompare(b.startDate)
    );
  
    return {
      activeRentals: activeRentals,
      cancellations: cancellations.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      )
    };
  }
  const { activeRentals, cancellations } = getFinalRentals(events);
  // console.log(activeRentals);
  // console.log(cancellations);

  // counter for final reservations
  const totalFinalRentals = activeRentals.length;
  // counter for final cancellations
  const totalFinalcancellations = cancellations.length;

  return (
    <div className="container mx-auto p-6">
      <p className="mb-4 text-lg font-semibold">Log file ({totalEvents})</p>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Timestamp
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              End Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Action
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedEvents.map((event, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">
                {new Date(event.timestamp).toLocaleString("de-DE")}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(event["start-date"])}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(event["end-date"])}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    event.action === "reservation"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {event.action}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* table of final reservations */}
      <p className="mt-8 mb-4 text-lg font-semibold">
        Final Reservations: ({totalFinalRentals})
      </p>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              End Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {activeRentals.map((rental, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{rental.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(rental.startDate)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(rental.endDate)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {new Date(rental.timestamp).toLocaleString("de-DE")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* table of cancellations */}
      <p className="mt-8 mb-4 text-lg font-semibold">
        All Cancellations: ({totalFinalcancellations})
      </p>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              End Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cancellations.map((cancel, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{cancel.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(cancel.startDate)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateToGerman(cancel.endDate)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {new Date(cancel.timestamp).toLocaleString("de-DE")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Car;
