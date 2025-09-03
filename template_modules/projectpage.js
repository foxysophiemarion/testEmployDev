// Настройки шаблона
import templateConfig from '../template.config.js'
// Логгер
import logger from './logger.js'

import { globSync } from 'glob'
import fs from 'fs'
import path from 'path';

const projectName = path.basename(path.resolve())

export default function projectPage() {
	return {
		name: 'add-project-page',
		apply: 'build',
		enforce: 'post',
		writeBundle: async ({ dir }) => {
			const htmlFiles = globSync('dist/*.html')
			let links = ``
			if (htmlFiles.length) {
				htmlFiles.forEach(async htmlFile => {
					const href = htmlFile.replace('dist\\', '')
					const name = href.replace('.html', '')
					links += `\n<li><a target="_blank" href="${href}">${name}</a></li>`
				});
			}
			let page = `
				<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="robots" content="noindex, nofollow">
	<title>Проект: %projectname%</title>
	<style>
		*,
		*::before,
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			bottom: 0;
		}

		body,
		html {
			height: 100%;
		}

		body {
			font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
			background-color: #333;
			color: #fff;
		}

		.wrapper {
			min-height: 100%;
			display: flex;
			flex-direction: column;
		}

		.wrapper>main {
			flex-grow: 1;
		}

		.projectpage {
			padding: 30px;
		}

		.projectpage__title {
			font-size: 30px;
			margin-bottom: 30px;
		}

		.projectpage__sub-title {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.projectpage__list {}

		.projectpage__list li {}

		.projectpage__list a {
			color: yellow;
		}

		.projectpage__list a:hover {}
	</style>
</head>
<body>
	<div class="wrapper">
		<header class="header"></header>
		<main class="projectpage">
			<h1 class="projectpage__title">Проект: %projectname%</h1>
			<h2 class="projectpage__sub-title">Страницы:</h2>
			<ul class="projectpage__list">
				%pages%
			</ul>
		</main>
		<footer class="footer"></footer>
	</div>
</body>
</html>
				`
			const template = fs.readFileSync(templateConfig.projectpage.template, 'utf-8')
			let pageTemplate = template || page

			pageTemplate = pageTemplate.replace(new RegExp('%projectname%', 'g'), templateConfig.projectpage.projectname || projectName)
			pageTemplate = pageTemplate.replace(new RegExp('%pages%', 'g'), links)

			fs.writeFileSync(`dist/${templateConfig.projectpage.outfilename || projectName.toLowerCase()}.html`, pageTemplate);
		}
	}
}