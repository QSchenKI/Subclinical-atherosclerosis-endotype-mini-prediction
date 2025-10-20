// ===========================
// Atherosclerosis Endotype Prediction Tool
// ===========================
// Authors: Qiao Sen Chen and Bruna Gigante
// Affiliation: Karolinska Institutet
// https://ki.se/personer/chen-qiaosen
// https://ki.se/personer/bruna-gigante
//
// Based on: https://pmc.ncbi.nlm.nih.gov/articles/PMC10730242/
// GitHub: https://github.com/QSchenKI/Subclinical_athero_endotype
// ===========================

// ============================================
// CRITICAL WARNING - VISUALIZATION ONLY
// ============================================
// This application is for VISUALIZATION and DEVELOPMENT purposes ONLY!
//
// ⚠️  ALL PREDICTIONS ARE NOT RELIABLE AND NOT VALIDATED ⚠️
//
// The predictions below are generated using simplified mock logic
// and do NOT represent actual machine learning model output or
// clinically validated predictions.
//
// DO NOT USE for:
// - Clinical decision-making
// - Research conclusions
// - Any real-world applications
//
// DEVELOPMENT STATUS:
// Full functionality is under development and depends on funding availability.
// This prototype demonstrates only the user interface workflow.
//
// For production use (when funding available):
// 1. Replace predictEndotype() function with actual sklearn model API call
// 2. Implement proper backend with trained model (.sav file)
// 3. Add appropriate clinical validation
// 4. Remove all mock logic and warnings
// ============================================

// Reference data for endotypes (this will be replaced with actual model predictions)
const ENDOTYPE_DATA = {
    1: {
        name: "Endotype 1",
        description: "Lowest risk profile with minimal inflammatory markers and optimal biomarker levels.",
        hazardRatio: 1.0,
        confidenceInterval: "Reference",
        riskCategory: "Low",
        riskBadgeClass: "bg-success",
        pathways: [
            "Baseline inflammatory state",
            "Normal vascular function",
            "Minimal oxidative stress"
        ],
        recommendations: [
            "Continue standard cardiovascular risk factor management",
            "Regular monitoring of lipid profile and blood pressure",
            "Maintain healthy lifestyle modifications"
        ]
    },
    2: {
        name: "Endotype 2",
        description: "Low-moderate risk with elevated IL6R signaling and mild inflammatory response.",
        hazardRatio: 2.1,
        confidenceInterval: "1.5-2.9",
        riskCategory: "Low-Moderate",
        riskBadgeClass: "bg-info",
        pathways: [
            "↑ IL6R-mediated inflammation",
            "Activated acute phase response",
            "Endothelial activation",
            "JAK-STAT signaling pathway"
        ],
        recommendations: [
            "Consider intensified statin therapy",
            "Monitor inflammatory markers (hs-CRP, IL6R)",
            "Evaluate for anti-inflammatory interventions",
            "Optimize management of diabetes and hypertension"
        ]
    },
    3: {
        name: "Endotype 3",
        description: "Moderate-high risk characterized by significant HSPB1 elevation and cellular stress response activation.",
        hazardRatio: 3.5,
        confidenceInterval: "2.7-4.5",
        riskCategory: "Moderate-High",
        riskBadgeClass: "bg-warning text-dark",
        pathways: [
            "↑↑ Heat shock protein response",
            "↑ Cellular stress pathways",
            "TNF-α signaling activation",
            "Oxidative stress response",
            "Protein folding stress"
        ],
        recommendations: [
            "Aggressive cardiovascular risk modification",
            "Consider advanced lipid-lowering therapy (PCSK9 inhibitors)",
            "Evaluate for secondary prevention strategies",
            "Close monitoring of cardiovascular events",
            "Consider specialized cardiology referral"
        ]
    },
    4: {
        name: "Endotype 4",
        description: "Highest risk with multi-pathway activation including IL6R, HSPB1, and systemic inflammatory dysregulation.",
        hazardRatio: 5.2,
        confidenceInterval: "4.1-6.8",
        riskCategory: "Very High",
        riskBadgeClass: "bg-danger",
        pathways: [
            "↑↑↑ Multi-pathway inflammatory activation",
            "↑↑ IL6R/JAK-STAT signaling",
            "↑↑ HSPB1-mediated stress response",
            "↑↑ TNFR1 activation",
            "Systemic endothelial dysfunction",
            "Advanced plaque instability markers"
        ],
        recommendations: [
            "Urgent cardiovascular risk assessment",
            "Maximal medical therapy for atherosclerosis",
            "Consider clinical trial enrollment for novel therapies",
            "Evaluate for coronary imaging (CT angiography or invasive angiography)",
            "Frequent follow-up with cardiology",
            "Consider anti-inflammatory therapy (e.g., colchicine, IL-6 inhibitors)",
            "Aggressive management of all modifiable risk factors"
        ]
    }
};

// ===========================
// Form Handling
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultsSection = document.getElementById('results-section');
    const inputSection = document.getElementById('input-section');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = collectFormData();

        // Show loading state
        showLoadingState();

        // Simulate prediction delay (in real app, this would be API call)
        setTimeout(() => {
            const prediction = predictEndotype(formData);
            displayResults(prediction);
            scrollToResults();
        }, 1000);
    });

    // Reset form handler
    form.addEventListener('reset', function() {
        form.classList.remove('was-validated');
        hideResults();
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
});

// ===========================
// Data Collection
// ===========================

function collectFormData() {
    return {
        demographics: {
            age: parseFloat(document.getElementById('age').value),
            sex: document.getElementById('sex').value,
            bmi: parseFloat(document.getElementById('bmi').value) || null,
            smoking: document.getElementById('smoking').value || null
        },
        biomarkers: {
            il6r: parseFloat(document.getElementById('il6r').value),
            hspb1: parseFloat(document.getElementById('hspb1').value),
            tnfr1: parseFloat(document.getElementById('tnfr1').value) || null,
            crp: parseFloat(document.getElementById('crp').value) || null,
            ldl: parseFloat(document.getElementById('ldl').value) || null,
            hdl: parseFloat(document.getElementById('hdl').value) || null
        }
    };
}

// ===========================
// Prediction Logic (Mock)
// ===========================

function predictEndotype(data) {
    // ============================================
    // ⚠️  MOCK PREDICTION - NOT RELIABLE ⚠️
    // ============================================
    // This is a simplified mock prediction logic for VISUALIZATION ONLY.
    // These predictions are NOT based on any validated model.
    //
    // CRITICAL WARNING:
    // - Predictions shown are NOT RELIABLE
    // - NOT validated for any use
    // - DO NOT use for clinical, research, or decision-making
    //
    // This prototype demonstrates UI workflow only.
    // Full functionality depends on funding availability.
    //
    // Future implementation (funding dependent):
    // - API call to backend sklearn model
    // - Proper feature preprocessing
    // - Clinical validation and testing
    // - Model validation and error handling
    // ============================================

    const { biomarkers, demographics } = data;
    let score = 0;

    // IL6R scoring (simplified)
    if (biomarkers.il6r > 2000) score += 2;
    else if (biomarkers.il6r > 1500) score += 1;

    // HSPB1 scoring
    if (biomarkers.hspb1 > 3000) score += 2;
    else if (biomarkers.hspb1 > 2000) score += 1;

    // hs-CRP scoring
    if (biomarkers.crp && biomarkers.crp > 3) score += 1;

    // TNFR1 scoring
    if (biomarkers.tnfr1 && biomarkers.tnfr1 > 1000) score += 1;

    // Age factor
    if (demographics.age > 65) score += 1;

    // LDL factor
    if (biomarkers.ldl && biomarkers.ldl > 130) score += 1;

    // Determine endotype based on score
    let endotype;
    if (score <= 1) endotype = 1;
    else if (score <= 3) endotype = 2;
    else if (score <= 5) endotype = 3;
    else endotype = 4;

    return {
        endotype: endotype,
        data: ENDOTYPE_DATA[endotype],
        inputData: data,
        predictionDate: new Date().toISOString()
    };
}

// ===========================
// Results Display
// ===========================

function displayResults(prediction) {
    const { endotype, data } = prediction;

    // Update endotype information
    const endotypeAlert = document.getElementById('endotype-alert');
    endotypeAlert.className = `alert ${getEndotypeAlertClass(endotype)}`;

    document.getElementById('endotype-value').textContent = endotype;
    document.getElementById('endotype-value').className = `badge fs-5 endotype-${endotype}`;
    document.getElementById('endotype-description').textContent = data.description;

    // Update risk metrics
    document.getElementById('hazard-ratio').textContent = data.hazardRatio.toFixed(1);
    document.getElementById('hazard-ratio').className = `badge ${data.riskBadgeClass}`;
    document.getElementById('confidence-interval').textContent = data.confidenceInterval;
    document.getElementById('risk-category').textContent = data.riskCategory;
    document.getElementById('risk-category').className = `badge ${data.riskBadgeClass}`;

    // Update pathway information
    const pathwayList = document.getElementById('pathway-list');
    pathwayList.innerHTML = '';
    data.pathways.forEach(pathway => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<i class="bi bi-arrow-right-circle-fill"></i> ${pathway}`;
        pathwayList.appendChild(li);
    });

    // Update clinical recommendations
    const recommendationsDiv = document.getElementById('clinical-recommendations');
    recommendationsDiv.innerHTML = '<h6 class="mb-3">Recommended Actions:</h6>';

    // Add critical warning to recommendations
    const demoWarning = document.createElement('div');
    demoWarning.className = 'alert alert-danger alert-sm mb-3';
    demoWarning.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <strong>⚠️ NOT RELIABLE:</strong> This prediction is NOT validated and NOT reliable.
        For visualization only. Full functionality under development (funding dependent).
    `;
    recommendationsDiv.appendChild(demoWarning);

    const ul = document.createElement('ul');
    ul.className = 'list-unstyled';
    data.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.className = 'mb-2';
        li.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> ${rec}`;
        ul.appendChild(li);
    });
    recommendationsDiv.appendChild(ul);

    // Show results section
    document.getElementById('results-section').style.display = 'block';
    hideLoadingState();
}

function getEndotypeAlertClass(endotype) {
    const classes = {
        1: 'alert-success',
        2: 'alert-info',
        3: 'alert-warning',
        4: 'alert-danger'
    };
    return classes[endotype] || 'alert-info';
}

// ===========================
// UI State Management
// ===========================

function showLoadingState() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-calculator"></i> Predict Endotype';
}

function scrollToResults() {
    setTimeout(() => {
        document.getElementById('results-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

function hideResults() {
    document.getElementById('results-section').style.display = 'none';
}

function newPrediction() {
    hideResults();
    document.getElementById('prediction-form').reset();
    document.getElementById('prediction-form').classList.remove('was-validated');
    document.getElementById('input-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===========================
// Input Validation
// ===========================

function validateInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

// ===========================
// Utility Functions
// ===========================

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export function for generating downloadable report (future enhancement)
function exportReport(prediction) {
    // This could generate a PDF or CSV export
    console.log('Export functionality to be implemented', prediction);
    alert('Export functionality coming soon!');
}

// ===========================
// API Integration (Template)
// ===========================

/**
 * Template for future API integration with backend sklearn model
 *
 * async function predictEndotypeAPI(data) {
 *     try {
 *         const response = await fetch('/api/predict', {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify(data)
 *         });
 *
 *         if (!response.ok) {
 *             throw new Error('Prediction failed');
 *         }
 *
 *         const result = await response.json();
 *         return result;
 *     } catch (error) {
 *         console.error('Error:', error);
 *         alert('Prediction failed. Please try again.');
 *         return null;
 *     }
 * }
 */

// ===========================
// Smooth Scrolling for Navigation
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
