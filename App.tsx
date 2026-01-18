
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import ImageCompressor from './tools/ImageCompressor';
import ImageResizer from './tools/ImageResizer';
import PasswordGenerator from './tools/PasswordGenerator';
import WordCounter from './tools/WordCounter';
import AccentRemover from './tools/AccentRemover';
import TextInverter from './tools/TextInverter';
import ColorExtractor from './tools/ColorExtractor';
import ImageConverter from './tools/ImageConverter';
import CharacterCounter from './tools/CharacterCounter';
import MetaTagGenerator from './tools/MetaTagGenerator';
import UtmLinkBuilder from './tools/UtmLinkBuilder';
import KeywordAnalyzer from './tools/KeywordAnalyzer';
import CodeFormatter from './tools/CodeFormatter';
import EncoderDecoder from './tools/EncoderDecoder';
import ApiTester from './tools/ApiTester';
import CurrencyConverter from './tools/CurrencyConverter';
import InterestCalculator from './tools/InterestCalculator';
import DiscountCalculator from './tools/DiscountCalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import BMICalculator from './tools/BMICalculator';
import BudgetPlanner from './tools/BudgetPlanner';
import ScrollToTop from './components/ScrollToTop';
import { TOOLS } from './constants';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-accent-blue-3 to-primary-dark text-primary-light font-sans">
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/termos-de-uso" element={<TermsOfUsePage />} />

            <Route path={TOOLS.IMAGE_COMPRESSOR.path} element={<ImageCompressor />} />
            <Route path={TOOLS.IMAGE_RESIZER.path} element={<ImageResizer />} />
            <Route path={TOOLS.PASSWORD_GENERATOR.path} element={<PasswordGenerator />} />
            <Route path={TOOLS.WORD_COUNTER.path} element={<WordCounter />} />
            <Route path={TOOLS.ACCENT_REMOVER.path} element={<AccentRemover />} />
            <Route path={TOOLS.TEXT_INVERTER.path} element={<TextInverter />} />
            <Route path={TOOLS.COLOR_EXTRACTOR.path} element={<ColorExtractor />} />
            <Route path={TOOLS.IMAGE_CONVERTER.path} element={<ImageConverter />} />
            <Route path={TOOLS.CHARACTER_COUNTER.path} element={<CharacterCounter />} />
            <Route path={TOOLS.META_TAG_GENERATOR.path} element={<MetaTagGenerator />} />
            <Route path={TOOLS.UTM_LINK_BUILDER.path} element={<UtmLinkBuilder />} />
            <Route path={TOOLS.KEYWORD_ANALYZER.path} element={<KeywordAnalyzer />} />
            <Route path={TOOLS.CODE_FORMATTER.path} element={<CodeFormatter />} />
            <Route path={TOOLS.ENCODER_DECODER.path} element={<EncoderDecoder />} />
            <Route path={TOOLS.API_TESTER.path} element={<ApiTester />} />
            <Route path={TOOLS.CURRENCY_CONVERTER.path} element={<CurrencyConverter />} />
            <Route path={TOOLS.INTEREST_CALCULATOR.path} element={<InterestCalculator />} />
            <Route path={TOOLS.DISCOUNT_CALCULATOR.path} element={<DiscountCalculator />} />
            <Route path={TOOLS.PERCENTAGE_CALCULATOR.path} element={<PercentageCalculator />} />
            <Route path={TOOLS.BMI_CALCULATOR.path} element={<BMICalculator />} />
            <Route path={TOOLS.BUDGET_PLANNER.path} element={<BudgetPlanner />} />

          </Routes>
        </Layout>
      </HashRouter>
    </div>
  );
}

export default App;
