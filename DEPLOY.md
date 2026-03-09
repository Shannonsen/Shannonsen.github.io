# Guía de Despliegue a GitHub Pages

## 📋 Pre-requisitos

- Repositorio: `Shannonsen.github.io`
- Cuenta de GitHub: Shannonsen
- Node.js 22+ instalado

## 🚀 Pasos para Desplegar

### 1. Push al Repositorio

```bash
git push origin main
```

Este comando subirá todos los cambios a GitHub.

### 2. Configurar GitHub Pages

Ve a tu repositorio en GitHub: https://github.com/Shannonsen/Shannonsen.github.io

**Opción A: Usando GitHub Actions (Recomendado)**

1. Ve a `Settings` > `Pages`
2. En "Build and deployment":
   - Source: Selecciona `GitHub Actions`
3. El workflow ya está configurado en `.github/workflows/deploy.yml`
4. Cada vez que hagas push a `main`, se desplegará automáticamente

**Opción B: Manualmente desde dist/**

1. Ve a `Settings` > `Pages`
2. En "Build and deployment":
   - Source: Selecciona `Deploy from a branch`
   - Branch: Selecciona `main`
   - Folder: Selecciona `/dist`
3. Click en `Save`

### 3. Verificar el Despliegue

Después de unos minutos, tu sitio estará disponible en:

**https://shannonsen.github.io**

### 4. Verificar el Workflow (si usas GitHub Actions)

1. Ve a la pestaña `Actions` en tu repositorio
2. Deberías ver el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (círculo verde ✓)

## 🔄 Actualizaciones Futuras

Para actualizar tu portfolio:

```bash
# 1. Hacer cambios en el código
# 2. Agregar los cambios
git add .

# 3. Crear commit
git commit -m "Actualización del portfolio"

# 4. Subir cambios
git push origin main
```

Si usas GitHub Actions, el sitio se actualizará automáticamente.

## 🐛 Solución de Problemas

### El sitio no se muestra

1. Verifica que GitHub Pages esté habilitado en Settings > Pages
2. Revisa que el workflow haya terminado exitosamente
3. Espera unos minutos (puede tardar hasta 10 minutos)

### Error en el workflow

1. Ve a Actions > Click en el workflow fallido
2. Revisa los logs para ver el error
3. Corrige el error y haz push de nuevo

### El sitio muestra 404

1. Verifica que el archivo `index.html` esté en la carpeta `dist`
2. Asegúrate de que la configuración de `base` en `vite.config.ts` sea correcta
3. Limpia el caché del navegador

## 📝 Comandos Útiles

```bash
# Ver status del repositorio
git status

# Ver archivos modificados
git diff

# Ver historial de commits
git log --oneline

# Crear build local para testing
npm run build

# Preview del build local
npm run preview
```

## 🎉 ¡Listo!

Tu portfolio ya está configurado y listo para desplegarse a GitHub Pages.
