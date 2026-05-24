pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/AjinkyaPatil95/PlayWrightAutomation.git',
                credentialsId: 'github-token'
            }
        }

        stage('Build and Run Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.40.0-focal'
                    args '-u root'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
            publishHTML target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ]
        }
    }
}