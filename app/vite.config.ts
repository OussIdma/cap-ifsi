import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Les noms de machine Tailscale (MagicDNS) sont acceptés comme hôtes.
  // Vite refuse par défaut un en-tête Host inconnu ; sans cette liste,
  // l'ouverture depuis un téléphone du tailnet renverrait « Blocked request ».
  // Cela n'ouvre aucun accès par soi-même : l'écoute reste limitée à
  // l'interface choisie par --host.
  server: { port: 5173, allowedHosts: ['.ts.net'] },
  preview: { port: 4173, allowedHosts: ['.ts.net'] },
})
