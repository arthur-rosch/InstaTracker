import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid url param' }, { status: 400 });
  }

  try {
    // Baixa a imagem da url externa
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
    }

    // Pega content-type para passar pro front (jpg, png, etc)
    const contentType = response.headers.get('content-type');
    
    // Passa o binário direto pro navegador
    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}