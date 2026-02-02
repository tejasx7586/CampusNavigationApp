// API service to connect to C++ backend
const API_BASE_URL = 'http://localhost:7070';

export async function fetchBuildings() {
  const response = await fetch(`${API_BASE_URL}/buildings`);
  if (!response.ok) {
    throw new Error('Failed to fetch buildings');
  }
  return response.json();
}

export async function fetchBuildingDetails(id) {
  const response = await fetch(`${API_BASE_URL}/building?id=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch building ${id}`);
  }
  return response.json();
}

export async function fetchBuildingFacilities(id) {
  const response = await fetch(`${API_BASE_URL}/building/facilities?id=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch facilities for building ${id}`);
  }
  return response.json();
}

export async function fetchDirections(from, to) {
  const response = await fetch(`${API_BASE_URL}/directions?from=${from}&to=${to}`);
  if (!response.ok) {
    throw new Error('Failed to fetch directions');
  }
  return response.json();
}

export async function searchByFacility(facilityName) {
  const response = await fetch(`${API_BASE_URL}/search/facility?name=${encodeURIComponent(facilityName)}`);
  if (!response.ok) {
    throw new Error(`Failed to search for facility: ${facilityName}`);
  }
  return response.json();
}

export async function fetchBuildingStatus(id, time) {
  const response = await fetch(`${API_BASE_URL}/status?id=${id}&time=${time}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch status for building ${id}`);
  }
  return response.json();
}