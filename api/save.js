import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message, image } = req.body;
    const slug = name.replace(/\s+/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000);
    
    // Simpan data ke database Vercel KV
    await kv.set(slug, { name, message, image });
    
    return res.status(200).json({ slug });
  }
  
  // Jika dipanggil lewat link bersih (idulfitri.web.id/slug)
  const { slug } = req.query;
  const data = await kv.get(slug);
  return res.status(200).json(data);
}
