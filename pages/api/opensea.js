// Next.js API route to proxy OpenSea API requests
// This solves the CORS issue when calling OpenSea API from the frontend

export default async function handler(req, res) {
  console.log('=== OPENSEA API PROXY DEBUG ===');
  console.log('API route hit! Method:', req.method);
  console.log('Query params:', req.query);
  console.log('API Key available:', !!process.env.NEXT_PUBLIC_OPENSEA_API_KEY);
  console.log('================================');

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { owner } = req.query;

  if (!owner) {
    return res.status(400).json({ error: 'Owner address is required' });
  }

  try {
    const headers = {
      'Accept': 'application/json',
    };

    // Add API key if available
    if (process.env.NEXT_PUBLIC_OPENSEA_API_KEY && process.env.NEXT_PUBLIC_OPENSEA_API_KEY !== 'your_opensea_api_key_here') {
      headers['X-API-KEY'] = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
    }

    // Fetch all NFTs with pagination
    let allNFTs = [];
    let nextCursor = null;
    let pageCount = 0;
    const maxPages = 10; // Safety limit to prevent infinite loops

    do {
      pageCount++;
      let url = `https://api.opensea.io/api/v2/chain/ethereum/account/${owner}/nfts?limit=50`;
      if (nextCursor) {
        url += `&next=${nextCursor}`;
      }

      console.log(`Fetching page ${pageCount}:`, url);

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenSea API error:', response.status, errorText);
        return res.status(response.status).json({
          error: 'OpenSea API error',
          status: response.status,
          details: errorText
        });
      }

      const data = await response.json();

      if (data.nfts && data.nfts.length > 0) {
        allNFTs = allNFTs.concat(data.nfts);
        console.log(`Page ${pageCount}: ${data.nfts.length} NFTs (Total so far: ${allNFTs.length})`);
      }

      nextCursor = data.next;

    } while (nextCursor && pageCount < maxPages);

    console.log(`Final result: ${allNFTs.length} total NFTs fetched across ${pageCount} pages`);

    // Return the data in the same format as a single page
    const responseData = {
      nfts: allNFTs,
      next: null // No more pages
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error('Error proxying OpenSea API request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
