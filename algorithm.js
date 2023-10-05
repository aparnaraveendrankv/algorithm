function findRoute(startCity, destinations, tickets) {
    // Create a graph to represent the connections between cities
    const graph = {};
    for (const ticket of tickets) {
      const [from, to] = ticket.split('-');
      if (!graph[from]) {
        graph[from] = [];
      }
      graph[from].push(to);
    }
  
    // Helper function for DFS
    function dfs(city, visited, route) {
      visited.add(city);
      route.push(city);
  
      if (route.length === destinations.length) {
        return route; 
      }
  
      if (graph[city]) {
        for (const neighbor of graph[city]) {
          if (!visited.has(neighbor)) {
            const result = dfs(neighbor, visited, route);
            if (result) {
              return result;
            }
          }
        }
      }
  
      visited.delete(city);
      route.pop();
      return null; 
    }
  
    const visited = new Set();
    const route = [];
    return dfs(startCity, visited, route);
  }
  
  const startCity = 'Kiev';
  const destinations = ['Amsterdam', 'Zurich', 'Prague', 'Berlin', 'Barcelona'];
  const tickets = [
    'Paris-Skopje', 'Zurich-Amsterdam', 'Prague-Zurich',
    'Barcelona-Berlin', 'Kiev-Prague', 'Skopje-Paris',
    'Amsterdam-Barcelona', 'Berlin-Kiev', 'Berlin-Amsterdam'
  ];
  
  const route = findRoute(startCity, destinations, tickets);
  
  if (route) {
    console.log('The route of son took is: ' + route.join(' -> '));
  } else {
    console.log('No valid route found!');
  }
  