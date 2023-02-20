#!/usr/bin/env bash

# Instala as dependências do projeto
npm install

# Constrói o projeto
ng build --prod

# Copia os arquivos de build para o diretório de implantação
cp -R dist/* $VERCEL_BUILD_DIR

# Instala as dependências de implantação
cd $VERCEL_BUILD_DIR
npm install --only=production
