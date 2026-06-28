function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    
    if (!payload.exp) return true;

    const now = Date.now() / 1000; 
    return payload.exp < now; 
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return true; 
  }
}