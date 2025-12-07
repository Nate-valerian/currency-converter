export async function GET(request) {
  console.log('API route called');

  // Return simple JSON to verify the route works
  return Response.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    test: 'This is a test response',
    status: 'OK'
  });
}

