import React, { useState } from "react";
import { Bar, Line, Pie, Scatter, Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register all Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CryptoChart = ({ searchQuery }) => {
  const [activeChart, setActiveChart] = useState("bar");
  
  // Sample crypto market data
  const cryptoData = [
    { 
      name: "bitcoin", 
      donations: 2300, 
      price: 42350, 
      marketCap: 828000000000,
      volume: 28000000000,
      change24h: 2.4,
      dominance: 48.2,
      color: "#F7931A" 
    },
    { 
      name: "ethereum", 
      donations: 2000, 
      price: 2250, 
      marketCap: 270000000000,
      volume: 15000000000,
      change24h: 1.8,
      dominance: 17.5,
      color: "#627EEA" 
    },
    { 
      name: "solana", 
      donations: 650, 
      price: 105, 
      marketCap: 45000000000,
      volume: 3500000000,
      change24h: 5.2,
      dominance: 2.8,
      color: "#00FFA3" 
    },
    { 
      name: "pepe", 
      donations: 900, 
      price: 0.0000012, 
      marketCap: 500000000,
      volume: 120000000,
      change24h: -3.1,
      dominance: 0.3,
      color: "#3FA129" 
    },
    { 
      name: "dogecoin", 
      donations: 1200, 
      price: 0.085, 
      marketCap: 12000000000,
      volume: 600000000,
      change24h: 0.5,
      dominance: 0.8,
      color: "#CBA54B" 
    },
    { 
      name: "cardano", 
      donations: 750, 
      price: 0.45, 
      marketCap: 15000000000,
      volume: 500000000,
      change24h: -1.2,
      dominance: 1.0,
      color: "#0033AD" 
    },
    { 
      name: "ripple", 
      donations: 1800, 
      price: 0.55, 
      marketCap: 30000000000,
      volume: 1200000000,
      change24h: 0.3,
      dominance: 1.8,
      color: "#27A2DB" 
    },
    { 
      name: "polkadot", 
      donations: 900, 
      price: 6.80, 
      marketCap: 8500000000,
      volume: 300000000,
      change24h: -2.4,
      dominance: 0.5,
      color: "#E6007A" 
    },
  ];

  const filteredData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Common chart options
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#666',
          font: {
            family: "'Inter', sans-serif",
          },
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#666',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      }
    },
  };

  // Chart configurations
  const chartConfigs = {
    bar: {
      data: {
        labels: filteredData.map((crypto) => crypto.name.toUpperCase()),
        datasets: [
          {
            label: "Donations ($)",
            data: filteredData.map((crypto) => crypto.donations),
            backgroundColor: filteredData.map((crypto) => `${crypto.color}CC`),
            borderColor: filteredData.map((crypto) => crypto.color),
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "CRYPTOCURRENCY DONATIONS",
            font: {
              size: 18,
              weight: 'bold',
            },
          },
        },
        scales: {
          ...baseOptions.scales,
          y: {
            ...baseOptions.scales.y,
            beginAtZero: true,
            ticks: {
              ...baseOptions.scales.y.ticks,
              callback: function(value) {
                return `$${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    },
    line: {
      data: {
        labels: filteredData.map((crypto) => crypto.name.toUpperCase()),
        datasets: [
          {
            label: "Price (USD)",
            data: filteredData.map((crypto) => crypto.price),
            borderColor: '#627EEA',
            backgroundColor: 'rgba(98, 126, 234, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: filteredData.map((crypto) => crypto.color),
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "CRYPTOCURRENCY PRICES",
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          tooltip: {
            ...baseOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                return ` $${context.raw.toLocaleString()}`;
              },
            }
          }
        },
        scales: {
          ...baseOptions.scales,
          y: {
            ...baseOptions.scales.y,
            ticks: {
              ...baseOptions.scales.y.ticks,
              callback: function(value) {
                return `$${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    },
    pie: {
      data: {
        labels: filteredData.map((crypto) => crypto.name.toUpperCase()),
        datasets: [
          {
            label: "Market Dominance (%)",
            data: filteredData.map((crypto) => crypto.dominance),
            backgroundColor: filteredData.map((crypto) => crypto.color),
            borderColor: '#fff',
            borderWidth: 1,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "MARKET DOMINANCE",
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          tooltip: {
            ...baseOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                return ` ${context.raw}%`;
              },
            }
          }
        }
      }
    },
    scatter: {
      data: {
        datasets: filteredData.map((crypto) => ({
          label: crypto.name.toUpperCase(),
          data: [{
            x: crypto.marketCap / 1000000000,
            y: crypto.volume / 1000000000,
            r: Math.sqrt(crypto.donations) * 2
          }],
          backgroundColor: `${crypto.color}CC`,
          borderColor: crypto.color,
          borderWidth: 1,
        }))
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "MARKET CAP VS VOLUME (BILLIONS)",
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          tooltip: {
            ...baseOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                return [
                  `Market Cap: $${context.raw.x.toLocaleString()}B`,
                  `Volume: $${context.raw.y.toLocaleString()}B`,
                  `Donations: $${filteredData[context.datasetIndex].donations.toLocaleString()}`
                ];
              },
            }
          }
        },
        scales: {
          x: {
            ...baseOptions.scales.x,
            title: {
              display: true,
              text: 'Market Cap ($B)',
              font: {
                weight: 'bold'
              }
            },
            beginAtZero: true
          },
          y: {
            ...baseOptions.scales.y,
            title: {
              display: true,
              text: '24h Volume ($B)',
              font: {
                weight: 'bold'
              }
            },
            beginAtZero: true
          }
        }
      }
    },
    bubble: {
      data: {
        datasets: [
          {
            label: "Price vs Market Cap",
            data: filteredData.map((crypto) => ({
              x: crypto.price,
              y: crypto.change24h,
              r: Math.cbrt(crypto.marketCap / 1000000000) * 5
            })),
            backgroundColor: filteredData.map((crypto) => `${crypto.color}CC`),
            borderColor: filteredData.map((crypto) => crypto.color),
            borderWidth: 1,
          }
        ]
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "PRICE VS 24H CHANGE",
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          tooltip: {
            ...baseOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const crypto = filteredData[context.dataIndex];
                return [
                  `Price: $${crypto.price.toLocaleString()}`,
                  `24h Change: ${crypto.change24h}%`,
                  `Market Cap: $${(crypto.marketCap / 1000000000).toLocaleString()}B`
                ];
              },
            }
          }
        },
        scales: {
          x: {
            ...baseOptions.scales.x,
            title: {
              display: true,
              text: 'Price (USD)',
              font: {
                weight: 'bold'
              }
            },
            type: 'logarithmic'
          },
          y: {
            ...baseOptions.scales.y,
            title: {
              display: true,
              text: '24h Change (%)',
              font: {
                weight: 'bold'
              }
            }
          }
        }
      }
    }
  };

  const renderChart = () => {
    switch (activeChart) {
      case "bar":
        return <Bar data={chartConfigs.bar.data} options={chartConfigs.bar.options} />;
      case "line":
        return <Line data={chartConfigs.line.data} options={chartConfigs.line.options} />;
      case "pie":
        return <Pie data={chartConfigs.pie.data} options={chartConfigs.pie.options} />;
      case "scatter":
        return <Scatter data={chartConfigs.scatter.data} options={chartConfigs.scatter.options} />;
      case "bubble":
        return <Bubble data={chartConfigs.bubble.data} options={chartConfigs.bubble.options} />;
      default:
        return <Bar data={chartConfigs.bar.data} options={chartConfigs.bar.options} />;
    }
  };

  return (
    <div style={{ 
      height: '500px', 
      padding: '20px', 
      backgroundColor: '#fff', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      margin: '20px 0'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {Object.keys(chartConfigs).map((chartType) => (
          <button
            key={chartType}
            onClick={() => setActiveChart(chartType)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: activeChart === chartType ? '#627EEA' : '#f5f5f5',
              color: activeChart === chartType ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: "'Inter', sans-serif",
              textTransform: 'capitalize',
              transition: 'all 0.2s ease',
              minWidth: '80px'
            }}
          >
            {chartType}
          </button>
        ))}
      </div>
      <div style={{ height: 'calc(100% - 60px)' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default CryptoChart;