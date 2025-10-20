import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Reusable Card component for consistent section styling
const Card: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-md ${className}`}>
        <h2 className="text-xl font-bold text-brand-blue-dark mb-4">{title}</h2>
        {children}
    </div>
);

// --- DATA DEFINITIONS ---

const platformPerformanceData = [
    { month: 'June', spend: '3,862', gmv: '48,130', newUsers: '572', leads: '387', cpl: '~8.3', roas: '10.39×', highlights: 'Baseline recovery; direct-to-package CVR 19% best performer' },
    { month: 'August', spend: '5,150', gmv: '60,911', newUsers: '910', leads: '602', cpl: '8.55', roas: '11.83×', highlights: 'CPL −17.9% MoM; app MAU 1.5 k; conversion 10.8%' },
    { month: 'September', spend: '6,102', gmv: '57,975', newUsers: '866', leads: '854', cpl: '7.2 (avg)', roas: '9.5×', highlights: 'Meta CPL $4.44 (best); overall GMV −4.8% MoM' },
];

const userRevenueTrendsData = [
    { metric: 'MAU', july: '1.2 k', aug: '1.5 k', sept: '1.7 k', trend: 'Steady growth (+41% Q over Q)' },
    { metric: 'New Users', july: '773', aug: '910', sept: '866', trend: 'Peak Aug; minor drop Sept' },
    { metric: 'New-user Conversion', july: '11.1 %', aug: '11.9 %', sept: '14.2 %', trend: 'Conversion efficiency improving' },
    { metric: 'Transactions', july: '162', aug: '201', sept: '218', trend: 'Volume rising' },
    { metric: 'AOV', july: '$297', aug: '$303', sept: '$266', trend: '↓ Sept (−12 %), dragging GMV' },
    { metric: 'GMV / MAU', july: '$40.1', aug: '$40.6', sept: '$34.1', trend: '↓ Sept → weaker monetization' },
];

const funnelPerformanceData = [
    { month: 'June', conversion: '10.9 %', directCVR: '18.9 %', dropOff: 'Package Details / Coach Details', engagement: '7 m 53 s' },
    { month: 'Aug', conversion: '10.8 %', directCVR: '16.6 %', dropOff: 'Coach Details & Package Details', engagement: '9 m 45 s (↑ 24%)' },
    { month: 'Sept', conversion: '≈ 10–11 %', directCVR: '≈ 16 % (est.)', dropOff: 'Same', engagement: '≈ 9 m+' },
];

const sportsDemandData = [
    { rank: 1, sport: 'Tennis', share: '43 %', observation: 'Core driver; main GMV source' },
    { rank: 2, sport: 'Swimming', share: '17 %', observation: 'Steady interest, good for family segment' },
    { rank: 3, sport: 'Pickleball', share: '10 %', observation: 'Emerging trend after Pickleball Palooza' },
    { rank: 4, sport: 'Badminton', share: '10 %', observation: 'Popular among youth' },
    { rank: 5, sport: 'Squash', share: '8 %', observation: 'Newly introduced category' },
];
const sportsPieData = sportsDemandData.map(d => ({ name: d.sport, value: parseFloat(d.share) }));
const PIE_COLORS = ['#0d48a2', '#115cd2', '#2875ee', '#ff4703', '#808080'];


// --- UI COMPONENTS FOR OVERVIEW PAGE ---

const ExecutiveOverview = () => (
    <Card title="Executive Overview">
        <div className="space-y-3 text-gray-700">
            <p>WOW Coach continued steady growth through Q3 2025, expanding both user base and gross merchandise value (GMV).</p>
            <p>Marketing investments across Xiaohongshu (XHS) and Meta (IG/FB) achieved improving cost-per-lead efficiency, with XHS proving the strongest GMV driver while Meta served effectively as a low-CAC entry funnel.</p>
        </div>
    </Card>
);

const PerformanceSummary = () => (
    <Card title="1. Platform & Marketing Performance Summary">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Month</th>
                        <th scope="col" className="px-4 py-3">Ad Spend (SGD)</th>
                        <th scope="col" className="px-4 py-3">GMV (SGD)</th>
                        <th scope="col" className="px-4 py-3">New Users</th>
                        <th scope="col" className="px-4 py-3">Leads</th>
                        <th scope="col" className="px-4 py-3">CPL (SGD)</th>
                        <th scope="col" className="px-4 py-3">ROAS</th>
                        <th scope="col" className="px-4 py-3">Key Highlights</th>
                    </tr>
                </thead>
                <tbody>
                    {platformPerformanceData.map(row => (
                        <tr key={row.month} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{row.month}</td>
                            <td className="px-4 py-4">{row.spend}</td>
                            <td className="px-4 py-4">{row.gmv}</td>
                            <td className="px-4 py-4">{row.newUsers}</td>
                            <td className="px-4 py-4">{row.leads}</td>
                            <td className="px-4 py-4">{row.cpl}</td>
                            <td className="px-4 py-4">{row.roas}</td>
                            <td className="px-4 py-4 min-w-[300px]">{row.highlights}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="text-sm text-gray-700 mt-4 font-semibold">Quarter total: ~15 K SGD ad spend → GMV 166 K SGD (≈ 11× blended ROAS)</p>
    </Card>
);

const UserRevenueTrends = () => (
    <Card title="2. User & Revenue Trends">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Metric</th>
                        <th scope="col" className="px-4 py-3">July</th>
                        <th scope="col" className="px-4 py-3">Aug</th>
                        <th scope="col" className="px-4 py-3">Sept</th>
                        <th scope="col" className="px-4 py-3">Trend & Insight</th>
                    </tr>
                </thead>
                <tbody>
                    {userRevenueTrendsData.map(row => (
                        <tr key={row.metric} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{row.metric}</td>
                            <td className="px-4 py-4">{row.july}</td>
                            <td className="px-4 py-4">{row.aug}</td>
                            <td className="px-4 py-4">{row.sept}</td>
                            <td className="px-4 py-4 min-w-[250px]">{row.trend}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="text-sm text-brand-orange mt-4 font-semibold">Key takeaway: more users are joining and converting, but spending less per transaction — main issue to address.</p>
    </Card>
);

const AdChannelBreakdown = () => (
    <Card title="3. Advertising Channel Breakdown">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-bold text-brand-blue-mid mb-2">XHS (主账号 + 代理)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><span className="font-semibold">Budget:</span> Jul $3,858 → Aug $4,471 → Sept $4,680 (+21%)</li>
                    <li><span className="font-semibold">Exposure:</span> 299 k → 346 k → 360 k (+20%)</li>
                    <li><span className="font-semibold">CTR:</span> 5.3 % → 4.7 % → 4.2 % (↓)</li>
                    <li><span className="font-semibold">CPC:</span> $0.24 → $0.27 → $0.31 (↑)</li>
                    <li><span className="font-semibold">Leads:</span> 363 → 512 → 534 (+47%)</li>
                    <li><span className="font-semibold">CPL:</span> $10.63 → $8.73 → $8.76 (↓18%)</li>
                    <li><span className="font-semibold">ROAS:</span> ≈ 7.85 × (Sept GMV ≈ 36.7k SGD)</li>
                </ul>
                <p className="text-xs italic mt-2 text-brand-grey"><b>Interpretation:</b> Top of funnel fatigue but bottom funnel conversion improving. Needed: creative refresh & retargeting.</p>
            </div>
            <div>
                <h3 className="font-bold text-brand-blue-mid mb-2">Meta (IG + FB)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><span className="font-semibold">Budget:</span> Jul $774 → Aug $679 → Sept $1,422</li>
                    <li><span className="font-semibold">Impressions:</span> 49 k → 52 k → 124 k</li>
                    <li><span className="font-semibold">Clicks:</span> 1,957 → 1,501 → 4,383</li>
                    <li><span className="font-semibold">CTR:</span> 4.0 % → 2.9 % → 3.5 %</li>
                    <li><span className="font-semibold">CPC:</span> $0.40 → $0.45 → $0.32</li>
                    <li><span className="font-semibold">Leads:</span> 142 → 90 → 320</li>
                    <li><span className="font-semibold">CPL:</span> $5.45 → $7.54 → $4.44 (best)</li>
                    <li><span className="font-semibold">ROAS:</span> 3.68 ×</li>
                </ul>
                <p className="text-xs italic mt-2 text-brand-grey"><b>Interpretation:</b> Regained efficiency in Sept. Best as low-CAC top-funnel & remarketing tool.</p>
            </div>
        </div>
    </Card>
);

const FunnelPerformance = () => (
     <Card title="4. Funnel & App Performance (GA / Firebase)">
        <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Month</th>
                        <th scope="col" className="px-4 py-3">Overall Conversion (Home→Order)</th>
                        <th scope="col" className="px-4 py-3">Direct Package Flow CVR</th>
                        <th scope="col" className="px-4 py-3">Main Drop-off Stage</th>
                        <th scope="col" className="px-4 py-3">Avg Engagement per User</th>
                    </tr>
                </thead>
                <tbody>
                    {funnelPerformanceData.map(row => (
                        <tr key={row.month} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{row.month}</td>
                            <td className="px-4 py-4">{row.conversion}</td>
                            <td className="px-4 py-4">{row.directCVR}</td>
                            <td className="px-4 py-4">{row.dropOff}</td>
                            <td className="px-4 py-4">{row.engagement}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="text-sm text-brand-orange mt-4 font-semibold">Takeaway: Direct-to-package pages consistently convert 2× better than multi-step flows → UI/UX simplification can lift sales 15–20 %.</p>
    </Card>
);


const SportsDemand = () => (
    <Card title="5. Sports Category Demand (Top 5)">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={sportsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                             {sportsPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3">Rank</th>
                            <th scope="col" className="px-4 py-3">Sport</th>
                            <th scope="col" className="px-4 py-3">Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sportsDemandData.map(row => (
                            <tr key={row.rank} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-4 font-medium text-gray-900">{row.rank}</td>
                                <td className="px-4 py-4">{row.sport}</td>
                                <td className="px-4 py-4">{row.share}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
);

const CostEfficiency = () => (
    <Card title="6. Cost & Efficiency Indicators (Q3 average)">
        <ul className="space-y-2 text-gray-700 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li className="p-3 bg-gray-50 rounded-md"><span className="font-semibold text-brand-blue-dark">Blended CAC:</span> ≈ $50 (range $47–54)</li>
            <li className="p-3 bg-gray-50 rounded-md"><span className="font-semibold text-brand-blue-dark">CPL:</span> $8.0 – $9.0</li>
            <li className="p-3 bg-gray-50 rounded-md"><span className="font-semibold text-brand-blue-dark">AOV Target:</span> $290 +</li>
            <li className="p-3 bg-gray-50 rounded-md"><span className="font-semibold text-brand-blue-dark">GMV/MAU Target:</span> $40 +</li>
            <li className="p-3 bg-gray-50 rounded-md"><span className="font-semibold text-brand-blue-dark">Repeat rate goal:</span> ≥ 30 %</li>
        </ul>
    </Card>
);

const FragmentedFunnel = () => (
    <Card title="7. Fragmented Funnel for Conversions">
        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
            <h3 className="font-bold text-brand-orange text-base sm:text-lg">WHY YOU NEED TO CAPTURE WEBSITE + WHATSAPP CONVERSIONS</h3>
            <p>Right now your funnel is fragmented:</p>
            <ul className="list-none space-y-1 pl-4 font-mono text-sm bg-gray-50 p-3 rounded-md">
                <li>Ad → App (tracked partially through Firebase <span className="text-green-500">✓</span>)</li>
                <li>Ad → WhatsApp → App/Booking (<span className="text-red-500">✗</span> not tracked)</li>
                <li>Website → App or Stripe Checkout (<span className="text-red-500">✗</span> mostly untracked)</li>
            </ul>
            <p>
                That means your analytics only see part of the user journey — you know how many people use the app, but not how many were influenced or converted through other channels (website or chat).
            </p>
            <p className="font-semibold">Without tracking those:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li>You can’t measure total lead sources (some conversions will look “organic” but actually came from paid).</li>
                <li>You can’t optimize WhatsApp messages or website CTAs.</li>
                <li>You’ll underreport your ROAS and misallocate ad budget.</li>
            </ul>
        </div>
    </Card>
);

const OverviewPage = () => (
    <div className="container mx-auto space-y-6">
        <ExecutiveOverview />
        <PerformanceSummary />
        <UserRevenueTrends />
        <AdChannelBreakdown />
        <FunnelPerformance />
        <SportsDemand />
        <CostEfficiency />
        <FragmentedFunnel />
    </div>
);


// --- UI COMPONENTS FOR ANALYTICS PAGE ---

const shortTermInsights = [
    "Creative Reset for XHS: new visuals & copy to lift CTR > 5%.",
    "Meta as Lead Magnet: continue low-ticket ($45 trial) offers to grow MAU.",
    "Focus on Tennis + Swimming content for ads & reels.",
    "App UX Tweak: collapse coach/package pages to reduce clicks."
];

const midTermInsights = [
    "72-hour Upgrade Mechanism: nurture low-ticket Meta leads into high-ticket XHS buyers.",
    "Reactivation Campaign for past users with bundle discounts.",
    "Referral & Loyalty Integration to increase retention > 30 %."
];

const budgetAllocationData = [
    { channel: 'XHS', split: '70–80 %', condition: 'Maintain until CTR > 5% and AOV rebound > $290' },
    { channel: 'Meta', split: '20–30 %', condition: 'If Lead → Paid ≥ 18 % and AOV ≥ $200 for 2 weeks → raise to 40 %' }
];

const unlockedMetricsData = [
    { stage: 'Ad → Install', metric: 'Cost-per-install (CPI)', help: 'Know which campaign acquires users cheapest' },
    { stage: 'Install → Sign-up', metric: 'Activation rate', help: 'Identify best creatives or offers' },
    { stage: 'Sign-up → Checkout', metric: 'Conversion rate', help: 'Optimize UX and messaging' },
    { stage: 'Checkout → Payment', metric: 'Revenue per source', help: 'Enables true ROAS / LTV per channel' },
    { stage: 'Returning users', metric: 'Retention rate', help: 'Judge loyalty & lifetime value' },
    { stage: 'Channel share', metric: 'Source breakdown (XHS, Meta, Organic)', help: 'Decide where to invest next' },
];

const optionalAddonsData = [
    { integration: 'Mixpanel / Amplitude', useCase: 'Deeper behavioral analytics, retention cohorts' },
    { integration: 'Hotjar / Firebase Analytics Heatmap', useCase: 'UX heatmaps to see drop-offs' },
    { integration: 'Google Tag Manager (GTM for Firebase)', useCase: 'Central place to manage tags & pixels' },
    { integration: 'Meta SDK (App Events)', useCase: 'Send in-app events back to Meta for smarter optimization' },
    { integration: 'WhatsApp API integration', useCase: 'Auto-tag chats with source campaign (so attribution isn’t lost)' },
];

const InsightSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div>
        <h3 className="text-lg font-semibold text-brand-blue-mid mb-3 flex items-center">
            {title}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

const AnalyticsPage = () => {
    return (
        <div className="container mx-auto space-y-6 text-gray-800">
            <Card title="Actionable Insights & Recommendations" className="!p-6">
                <div className="space-y-8">
                    <InsightSection title="1. Short-Term (Oct – Nov)" items={shortTermInsights} />
                    <InsightSection title="2. Mid-Term (Q4)" items={midTermInsights} />
                    
                    <div>
                        <h3 className="text-lg font-semibold text-brand-blue-mid mb-3 flex items-center">
                             3. Budget Allocation Guideline
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Channel</th>
                                        <th scope="col" className="px-4 py-3">Recommended Split</th>
                                        <th scope="col" className="px-4 py-3">Condition to Adjust</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetAllocationData.map((row, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-4 font-medium text-gray-900">{row.channel}</td>
                                            <td className="px-4 py-4">{row.split}</td>
                                            <td className="px-4 py-4 min-w-[300px]">{row.condition}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>

            <Card title="1. Current Funnel Reality (and Its Tracking Gaps)">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-brand-blue-mid mb-2">Current Flow</h3>
                        <p className="font-mono text-sm bg-gray-50 p-3 rounded-md">Ad → App Store → Download → In-App Booking (Stripe checkout)<br/>Sometimes: Ad → WhatsApp → Manual chat → CS sends link → App → Checkout</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-brand-blue-mid mb-2">What’s happening right now</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Stage</th>
                                        <th className="px-4 py-2 text-left">Tool</th>
                                        <th className="px-4 py-2 text-left">Problem</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-b"><td className="px-4 py-2 font-medium">Ad (Meta/XHS)</td><td className="px-4 py-2">Managed by vendor</td><td className="px-4 py-2">Clicks tracked but no deep link attribution</td></tr>
                                    <tr className="border-b"><td className="px-4 py-2 font-medium">App install</td><td className="px-4 py-2">App Store / Google Play</td><td className="px-4 py-2">Not linked to ad source (no install tracking pixel)</td></tr>
                                    <tr className="border-b"><td className="px-4 py-2 font-medium">In-app activity</td><td className="px-4 py-2">Firebase / GA4</td><td className="px-4 py-2">Tracks events, but not source of user (no UTM)</td></tr>
                                    <tr className="border-b"><td className="px-4 py-2 font-medium">Checkout (Stripe)</td><td className="px-4 py-2">Payment data siloed</td><td className="px-4 py-2">Doesn’t send purchase events back to GA or ad platforms</td></tr>
                                    <tr><td className="px-4 py-2 font-medium">WhatsApp routing</td><td className="px-4 py-2">Manual</td><td className="px-4 py-2">Breaks attribution chain completely</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-sm text-brand-orange mt-4 font-semibold p-3 bg-orange-50 rounded-md">Result: You can see installs, users, and transactions — but not which ad, channel, or campaign drove them.</p>
                </div>
            </Card>

            <Card title="2. What You Must Integrate (Non-Negotiables for Tracking)">
                 <p className="text-sm text-gray-600 mb-4">Below is your minimum viable tracking architecture — once this is done, you’ll have a clear funnel attribution from impression → install → purchase.</p>
                 <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-brand-blue-mid text-md">A. Install & App Event Attribution</h3>
                        <p className="text-sm my-1"><span className="font-bold">Tool:</span> Firebase + GA4 + Apple SKAdNetwork (iOS) + Google Play Install Referrer (Android)</p>
                        <p className="text-sm"><span className="font-bold">Purpose:</span> Tells you which ad or campaign caused the install.</p>
                        <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-2">
                           <li>Integrate Firebase SDK with GA4 linked.</li>
                           <li>Enable Google Ads / Meta Ads linking inside GA4 → “Attribution Settings.”</li>
                           <li>Use UTM deep links (via Branch, Adjust, or AppsFlyer).</li>
                           <li>Activate SKAdNetwork (for iOS) and Google Install Referrer (for Android).</li>
                        </ul>
                         <p className="text-sm font-semibold mt-2">Result: You’ll know which campaign generated installs and what those users did in-app.</p>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">B. Conversion & Revenue Tracking</h3>
                        <p className="text-sm my-1"><span className="font-bold">Tool:</span> Firebase events + Stripe integration → GA4 & ad platforms.</p>
                        <p className="text-sm"><span className="font-bold">Purpose:</span> Send purchase events with value back to analytics and ad platforms.</p>
                        <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-2">
                            <li>Add custom Firebase events: <code className="text-xs bg-gray-100 p-1 rounded">view_coach_detail</code>, <code className="text-xs bg-gray-100 p-1 rounded">begin_checkout</code>, <code className="text-xs bg-gray-100 p-1 rounded">purchase_completed</code>.</li>
                            <li>Send <code className="text-xs bg-gray-100 p-1 rounded">purchase_completed</code> events (with transaction value) to GA4, Meta Pixel/CAPI, and XHS pixel.</li>
                            <li>Use webhooks from Stripe → Firebase Cloud Functions to push revenue events automatically.</li>
                        </ul>
                         <p className="text-sm font-semibold mt-2">Result: You can see full funnel metrics (impressions → install → purchase value) and accurate ROAS per channel.</p>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">C. Deep Link + Deferred Deep Link</h3>
                        <p className="text-sm my-1"><span className="font-bold">Tool:</span> Branch.io or Firebase Dynamic Links</p>
                        <p className="text-sm"><span className="font-bold">Purpose:</span> Send users directly from ad → correct in-app screen after install.</p>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">D. Server-Side Event Forwarding</h3>
                        <p className="text-sm my-1"><span className="font-bold">Tool:</span> Facebook CAPI, Google Ads API, XHS API</p>
                        <p className="text-sm"><span className="font-bold">Purpose:</span> Ensures ad platforms receive accurate conversion data even if cookies are blocked.</p>
                    </div>
                     <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">E. Web + App Unified Measurement</h3>
                        <p className="text-sm my-1"><span className="font-bold">Tool:</span> GA4 property with both Web stream + App stream connected</p>
                        <p className="text-sm"><span className="font-bold">Purpose:</span> See if users start on your website then download app or WhatsApp.</p>
                    </div>
                 </div>
            </Card>

            <Card title="3. Metrics You’ll Unlock Once Setup Is Complete">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">Funnel Stage</th>
                                <th className="px-4 py-2 text-left">Metric</th>
                                <th className="px-4 py-2 text-left">How It Helps Marketing</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {unlockedMetricsData.map(row => (
                                <tr className="border-b" key={row.metric}>
                                    <td className="px-4 py-2 font-medium">{row.stage}</td>
                                    <td className="px-4 py-2">{row.metric}</td>
                                    <td className="px-4 py-2">{row.help}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card title="4. Optional but Highly Valuable Add-ons">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">Integration</th>
                                <th className="px-4 py-2 text-left">Use Case</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {optionalAddonsData.map(row => (
                                <tr className="border-b" key={row.integration}>
                                    <td className="px-4 py-2 font-medium">{row.integration}</td>
                                    <td className="px-4 py-2">{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            <Card title="Website & WhatsApp Tracking Strategy">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-brand-blue-mid text-md">A. Add Google Tag Manager (GTM) to your website</h3>
                        <p className="text-sm my-1">That becomes your central tracking container. Inside GTM:</p>
                        <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-4">
                           <li>Add Google Analytics 4 tag → sends all events to GA4.</li>
                           <li>Add Meta Pixel → to track ad-driven visitors.</li>
                           <li>Add XHS Pixel (小红书像素) → if they allow external conversion tracking.</li>
                        </ul>
                    </div>
                     <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">B. Use WhatsApp Click Tracking Links</h3>
                        <p className="text-sm my-1">For ads that direct to WhatsApp, use trackable links. Inside WhatsApp:</p>
                         <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-4">
                           <li>Train your customer support team to tag each chat (e.g., “Lead – Tennis / From Meta”).</li>
                           <li>Later, you can cross-check how many WhatsApp chats lead to completed bookings.</li>
                        </ul>
                    </div>
                     <div className="border-t pt-4">
                        <h3 className="font-semibold text-brand-blue-mid text-md">C. More Advance: AI Integration</h3>
                        <p className="text-sm my-1">Integrate with AI to handle chat and only direct to support if question/inquiries are complex. This ensures most inquiries and touchpoints are addressed instantly to reduce drop-off.</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};


// --- UI COMPONENTS FOR OCTOBER PAGE ---

const brandOptimisationData = [
    { area: 'Social Bios (IG, TikTok, FB)', deliverable: 'Rewrite profile bios with clear value statement + local SEO keywords (e.g. “Book verified sports coaches in Singapore”)', objective: 'Increase discovery & click-through' },
    { area: 'Link in Bio / CTA Landing', deliverable: 'a simple landing with quick button actions, be it for lead magnet, download app or quick form submission since website is not functional for conversion at the moment, direct customer support whatsapp for queries', objective: 'Centralised CTA funnel' },
    { area: 'Highlight Covers + Story Categories', deliverable: 'Design consistent covers (Tennis, Swimming)', objective: 'Brand consistency' },
    { area: 'Hashtag Library', deliverable: 'Build segmented sets (#SingaporeSports #WOWCoach #TennisSG etc.)', objective: 'Consistent reach optimisation' },
];

const contentEngineData = [
    { format: 'Short Reels / TikToks', frequency: '1 per day', themes: 'Quick coach tips, behind-the-scenes, funny training moments' },
    { format: 'IG Stories', frequency: 'Daily', themes: 'Polls (“Tennis or Swim?”), progress clips, class ambience' },
    { format: 'Static Posts / Carousels', frequency: '2–3 × per week', themes: '“Top 3 beginner mistakes in tennis”, “How to choose your coach”' },
    { format: 'UGC / Coach Features', frequency: '1 × per week', themes: 'Coach spotlight with CTA “Book on WOW Coach App”' },
    { format: 'Community Interaction', frequency: 'Daily', themes: 'Reply to DMs/comments, reshare client tags, thank-you posts' },
];

const LinkIcon = () => (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);

const OctoberPage = () => (
    <div className="container mx-auto space-y-6">
        <Card title="Proposal Files">
            <div className="space-y-4">
                 <a 
                    href="https://drive.google.com/file/d/17SSX35KSG-cqLcOU37fJDis3wcESIppx/view?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
                >
                    <span>Halloween Campaign</span>
                    <LinkIcon />
                </a>
                <a 
                    href="https://drive.google.com/file/d/1jIsYpafjvhDaqr3SqU6y6d6xVcgmChpg/view?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-brand-blue-mid text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
                >
                    <span>Organic Posting</span>
                    <LinkIcon />
                </a>
            </div>
        </Card>
         <Card title="October Execution Plan">
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-brand-blue-mid mb-4">1. Brand & Channel Optimisation (Week 1)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Area & Deliverable</th>
                                    <th className="px-4 py-3">Objective</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandOptimisationData.map(row => (
                                    <tr key={row.area} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-4 min-w-[300px]">
                                            <p className="font-semibold text-gray-900">{row.area}</p>
                                            <p className="text-xs text-gray-500 mt-1">{row.deliverable}</p>
                                        </td>
                                        <td className="px-4 py-4 min-w-[200px]">{row.objective}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-brand-blue-mid mb-4">2. Daily Content Engine (Weeks 2–4)</h3>
                    <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Format</th>
                                    <th className="px-4 py-3">Frequency</th>
                                    <th className="px-4 py-3">Example Themes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contentEngineData.map(row => (
                                    <tr key={row.format} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-4 font-medium text-gray-900">{row.format}</td>
                                        <td className="px-4 py-4">{row.frequency}</td>
                                        <td className="px-4 py-4 min-w-[300px]">{row.themes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-sm text-brand-orange mt-4 font-semibold p-3 bg-orange-50 rounded-md">
                    Output goal: consistent daily posting cadence → higher engagement → steady app downloads.
                </p>
            </div>
        </Card>
    </div>
);


// --- UI COMPONENTS FOR DEV CHECKLIST PAGE ---

const multiChannelAttributionData = [
    { task: 'Add utm_source, utm_medium, utm_campaign to every ad & bio link', tool: 'All ad platforms', notes: 'Example: utm_source=tiktok&utm_medium=cpc&utm_campaign=tennis_trial' },
    { task: 'Use Firebase Dynamic Links (or Branch.io) for app installs', tool: 'Firebase', notes: 'Carries utm_ data through App Store install and first open' },
    { task: 'Integrate TikTok Pixel SDK (App + Web)', tool: 'TikTok Events API', notes: 'For install + conversion tracking' },
    { task: 'Integrate Meta SDK / Conversions API', tool: 'Facebook SDK', notes: 'For installs, add-to-cart, purchases' },
    { task: 'Enable XHS (小红书) Pixel / API (if available)', tool: 'XHS API', notes: 'Attribute conversions to XHS ads' },
    { task: 'Link Firebase ↔ GA4 ↔ Google Ads', tool: 'Firebase Integrations', notes: 'Pass event data to Google Ads campaigns' },
    { task: 'Add Install Referrer API (Android) & SKAdNetwork (iOS)', tool: 'Mobile SDK', notes: 'Required for privacy-compliant attribution' },
];

const firebaseEventsDataNew = [
    { event: 'app_install_source', trigger: 'On first open', params: 'utm_source, utm_medium, utm_campaign' },
    { event: 'view_coach_detail', trigger: 'Coach profile opened', params: 'coach_id, sport, source' },
    { event: 'view_package_detail', trigger: 'Package opened', params: 'package_id, price, sport, source' },
    { event: 'begin_checkout', trigger: 'Click “Book Now”', params: 'package_id, price, source' },
    { event: 'purchase_completed', trigger: 'Stripe payment success', params: 'amount, currency, sport, is_new_user, source' },
    { event: 'registration_completed', trigger: 'Account created', params: 'source, referral_code' },
    { event: 'whatsapp_click', trigger: 'Tap WA button', params: 'screen_name, source' },
    { event: 'notification_banner_view', trigger: 'In-app banner or promo notification viewed', params: 'banner_id, placement, source' },
    { event: 'notification_banner_click', trigger: 'User clicks banner', params: 'banner_id, destination, source' },
];

const websiteAnalyticsData = [
    { step: 'Install Google Tag Manager', action: 'Master container for all pixels' },
    { step: 'Add GA4, Meta Pixel, TikTok Pixel, XHS Pixel', action: 'All linked to same GA4 property' },
    { step: 'Track events: page_view, cta_click, form_submit, whatsapp_click, purchase_web', action: 'Include utm_ data' },
    { step: 'Add Hotjar (or Microsoft Clarity)', action: 'Heatmap & session replay of landing page' },
    { step: 'Verify same GA4 User-ID as app to unify users', action: 'Enables cross-device attribution' },
];


const DevChecklistPage = () => (
    <div className="container mx-auto space-y-6 text-gray-800">
        <Card title="Goal">
            <p className="text-sm text-gray-600">Give marketing full visibility across every user touchpoint — from ad impression → website → app → booking → Stripe payment → WhatsApp → notifications.</p>
        </Card>

        <Card title="1. Multi-Channel Attribution (Know exactly where users come from)">
            <p className="text-sm text-gray-600 mb-4">Implement for all ad sources: Meta, TikTok, XHS, Google, Organic, Referral.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Task</th>
                            <th className="px-4 py-2 text-left">Tool</th>
                            <th className="px-4 py-2 text-left">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {multiChannelAttributionData.map(row => (
                            <tr className="border-b" key={row.task}>
                                <td className="px-4 py-2 font-medium">{row.task}</td>
                                <td className="px-4 py-2">{row.tool}</td>
                                <td className="px-4 py-2">{row.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-sm font-semibold mt-4">Expected result: GA4 and Firebase will show source/medium for every user session and purchase.</p>
        </Card>

        <Card title="2. Firebase / In-App Event Tracking">
             <h3 className="font-semibold text-brand-blue-mid mb-2">Core Marketing Events</h3>
             <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                    <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Event</th>
                            <th className="px-4 py-2 text-left">Trigger</th>
                            <th className="px-4 py-2 text-left">Parameters</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {firebaseEventsDataNew.map(row => (
                            <tr className="border-b" key={row.event}>
                                <td className="px-4 py-2 font-medium"><code className="text-xs bg-gray-100 p-1 rounded">{row.event}</code></td>
                                <td className="px-4 py-2">{row.trigger}</td>
                                <td className="px-4 py-2">{row.params}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className="font-semibold text-brand-blue-mid mb-2">Technical Notes</h3>
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Use <code className="text-xs bg-gray-100 p-1 rounded">logEvent()</code> in Firebase SDK (Android + iOS).</li>
                <li>Mark <code className="text-xs bg-gray-100 p-1 rounded">purchase_completed</code>, <code className="text-xs bg-gray-100 p-1 rounded">banner_click</code>, and <code className="text-xs bg-gray-100 p-1 rounded">registration_completed</code> as Conversions in GA4.</li>
                <li>All events must include <code className="text-xs bg-gray-100 p-1 rounded">source</code> so attribution flows end-to-end.</li>
            </ul>
        </Card>

        <Card title="3. Stripe → Firebase / GA4 Link">
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Use Stripe webhook (<code className="text-xs bg-gray-100 p-1 rounded">checkout.session.completed</code>) → Cloud Function logs <code className="text-xs bg-gray-100 p-1 rounded">purchase_completed</code>.</li>
                <li>Parameters: <code className="text-xs bg-gray-100 p-1 rounded">amount, currency, user_id, sport_type, source</code>.</li>
                <li>Optional: mirror this to Meta & TikTok Conversions APIs.</li>
            </ul>
        </Card>

        <Card title="4. Website Analytics (Currently under-utilised)">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-brand-blue-dark uppercase bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Step</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {websiteAnalyticsData.map(row => (
                            <tr className="border-b" key={row.step}>
                                <td className="px-4 py-2 font-medium">{row.step}</td>
                                <td className="px-4 py-2">{row.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

        <Card title="5. WhatsApp Funnel Tracking">
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Replace all wa.me links with UTM-tagged URLs.</li>
                <li className="pl-4">Example: <code className="text-xs bg-gray-100 p-1 rounded">https://wa.me/659XXXXXXX?text=Hi&utm_source=instagram&utm_campaign=tennis_trial</code></li>
                <li>Track click events via GTM or Firebase (<code className="text-xs bg-gray-100 p-1 rounded">whatsapp_click</code>).</li>
                <li>Long-term: integrate WhatsApp Business API / CRM (WATI, Zoko, Twilio) to record chat source and conversion.</li>
            </ul>
        </Card>

        <Card title="6. Push Notification & Banner Tracking (New Requirement)">
            <p className="text-sm text-gray-600 mb-2">Problem: Current homepage banners sent via notification aren’t tracked.</p>
            <h3 className="font-semibold text-brand-blue-mid mb-2">Solution</h3>
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Assign unique <code className="text-xs bg-gray-100 p-1 rounded">banner_id</code> for each push or promo banner.</li>
                <li>Log two events in Firebase: <code className="text-xs bg-gray-100 p-1 rounded">notification_banner_view</code> and <code className="text-xs bg-gray-100 p-1 rounded">notification_banner_click</code>.</li>
                <li>Parameters: <code className="text-xs bg-gray-100 p-1 rounded">banner_id, placement, target_page, user_id, utm_source</code>.</li>
                <li>Optional: add <code className="text-xs bg-gray-100 p-1 rounded">banner_impression</code> → GA4 custom dimension for CTR analysis.</li>
                <li>Link these banners to UTM-tagged URLs so follow-up behavior is attributed.</li>
            </ul>
        </Card>

        <Card title="7. Heatmap & UX Insight">
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li><strong>Tool:</strong> Hotjar / FullStory / Firebase In-App Heatmap plugin</li>
                <li><strong>Purpose:</strong> Understand tap hotspots, scroll depth, drop-offs</li>
                <li>A/B test banners or CTA placements based on heatmap results.</li>
            </ul>
        </Card>

        <Card title="8. GA4 + Looker Studio Dashboard Setup">
            <h3 className="font-semibold text-brand-blue-mid mb-2">Deliverable: One unified reporting dashboard.</h3>
            <h4 className="font-medium mb-1 mt-2">Metrics to display:</h4>
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Installs by source (Meta, TikTok, XHS, Organic)</li>
                <li>Purchases by channel</li>
                <li>CTR on homepage banners</li>
                <li>Revenue (Stripe) by sport</li>
                <li>Conversion funnel: view_coach_detail → begin_checkout → purchase_completed</li>
                <li>WhatsApp click volume → app downloads</li>
            </ul>
        </Card>

        <Card title="9. QA & Validation">
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>Use Firebase DebugView to verify all new events fire.</li>
                <li>Test Android & iOS links from TikTok, XHS, Meta.</li>
                <li>Confirm GA4 “Source / Medium” shows expected attribution.</li>
                <li>Verify Hotjar recording and banner click heatmap appear.</li>
                <li>Match Stripe revenue totals with GA4 revenue for accuracy.</li>
            </ul>
        </Card>
        
        <Card title="Outcome After Setup">
            <p className="text-sm text-gray-600 mb-2">You will have:</p>
            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>End-to-end visibility of where every user came from (TikTok, Meta, XHS, organic, WhatsApp)</li>
                <li>Conversion tracking for installs, bookings, payments, and banners</li>
                <li>Heatmap data for UI optimization</li>
                <li>Reliable ROAS, CAC, and funnel analytics in one GA4 dashboard</li>
            </ul>
        </Card>

    </div>
);


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('overview');
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
            {activePage === 'overview' && <OverviewPage />}
            {activePage === 'analytics' && <AnalyticsPage />}
            {activePage === 'october' && <OctoberPage />}
            {activePage === 'devChecklist' && <DevChecklistPage />}
        </main>
      </div>
    </div>
  );
};

export default App;