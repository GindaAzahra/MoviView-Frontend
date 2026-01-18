const movies = [
    {
        title: "Aether Rise",
        date: "DEC 12",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3QxwCkRTSNVtO_dqZFxFXldnqmQTPu1zFLrz-VV_eWporUHVLdaUnqDQvBPjzEOk_5Y2qWU8B_Vl0XW444kBs7THFTMuhCR-XgBhA8KLHlyok7Gl4Gl5u3-WgR3kgw4MMWSBRhJZW-uudHGmI96Glar7H8WjusUSaBDjYjrB_9KqXOvt8sPU6MWo-dMLSZVrCnGDxVz_tASWbgkOgWb6CMOZRRZKfp3BuJr1M4KIVynQsdmha2A2trfPgo9bxCXOzXY0ZjAgC8_k"
    },
    {
        title: "Silent Echo",
        date: "DEC 24",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBswP6vPuxVvPc_1GPv0VgFijn3gcXBKVLuthnqIw1VXDC3ZhBI9etAFow4xjRkuYQVi61S0NA5Ska1sTb60CvvPw12EO3fgcjE-y9fd_2FrGEoKWc2KLbE78RAZr65RlLpLfuqzynCEKkEiW6IAmBmcdjGgL2O_N8jq-eFHmaHQ306wi9zx1whBv7c3O7A1ikKjbD83PIMHuEhMTRHtfLSgFOE3rqiPP9Mm0TY5tiSw-Lhw7Zl0p0hHCibNCn6QymVbTOiJSM5fCU"
    },
    {
        title: "Midnight City",
        date: "JAN 05",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFjAaP2X2utIm9RU1La7_W95lj2znA-JQKT3Z82bWPfUHsXnLKaSLlLIMQtag3nsYsMXh06R-ip84DGlS5ADN7EyLI0LbvfDylsDdKb6lHXIvHPgP4oNDZN2qs0OwLMzpQ3ckm1ljgnNO_ezkQsoaRRlBcefIgwFbdJ1Flx0VgLZbmOIROyIxDY_yERYOLHdyP7egH4EjQl1U0tzEP0Ha8Uywn9JtTLxNA7hj-b4MgyC-glhQmQ4M8691iTHf5yDGtET0uLTxp30A"
    },
    {
        title: "The Weaver",
        date: "JAN 18",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvq4lraD9yU2YrfnfocXHLN93OZpaGyYoNlgkMPFDbqavJzSOONVx-WP5yConkG1sbPYoFR8PrcOT4eoVuvHF0rkK9aF50wAb5PD9w4SZx4uSjQn_tCNbixotl_kBIic0Ogq5cr8rQaNy9OiG2igViuPhddRdaCn4BPjfGd06eXghuVLKfdShmRVnO1Ks7xOY2LLniFsDP4lq2OjPxX-zBn2euiFnlX1ilg6uB1_p3coCIIYJYH61vuhtwnYaArz5KJlvzifEI1I8"
    },
    {
        title: "Shadow Realm",
        date: "FEB 02",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZaYyX672zSu2p3PNd3NFIgaVqRqcg4mxxiA4GE5237zDNBG2rb9ENXpU5Ysq3fw-gZoeWNlwQJNMNcmbTOi04LShI-VPGxnL7ECJ95lIc_emTy0ErPqMNigY_l0pTABVKa4vcZSiWh8QuG3BTBoYK5870E9_lyEjXSJOou2i97_Mbaw6oC5WDHzCI0f040jhJkuLU4oKDB5GHKIwSqfgDSZkqbHU4U2-P0Ur6gJWcqlQW0ZLvkeoWn7ynxY7RE8cm2SM0VHSYq6c"
    },
    {
        title: "Neon Skies",
        date: "FEB 14",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQOCL9IcpNvHcQhqubOoFvoAlZTnLm08hZClBb0IXZbC-QZ5Evi1riqwsIxQzLae8EXD2FNI6skT0Mcjnx_AeRCj5P0d5gUgMYEi9Z-ZGfAFifX_aNt1nAhxg_8WYXfowczNOCt66OfSsS8U9NBk3mFfTNCGjLxuIf9f2XVmRiQweoc-b9tG-MlpujH2VbtlNpKI21gYhegvYB_fohW-Bx8VwiVdHtzorwtYpS0jBdbuNmdy1bQGi79hb_Fq4fzFpc15CC6Zdt-3c"
    },
    {
        title: "Frozen Lakes",
        date: "MAR 01",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcnYXn1_KE0lS4H2JT5VVZeNqIbhLekgAOW4HTVS0SDJYVnoyBRFf0RN4nHTqBr66B4DP-0UhMIjaeP-80mpfwllAqlgFFLK6ZHIDZU3QZCpcMDNBGF-fSm1Ul4uSLs6a7cy5jvlyWuC4K2G4-LsgPqlewBNVFWr0l05zi7yvp9Z3wJwimvrKHC_cuO1Ub5ltSA4zZbRod3fhDfPSFlWD5yG2pmWO7SaIRTbIBMVcx8T00WF8bPYPT56buX3irW37Pg2ELPWExXws"
    },
    {
        title: "The Protocol",
        date: "MAR 15",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxnnZYteoiQVCftSieiOKuxt_i72L4o0GF3EvE4LiNWML8_MyTxdhdrvStoDJdzawtITwqUj4H_RXkfx50dvPRqfIYF_CevUUsqxmj3-wNrKn8jE-h1Ri8xob4DAt1kWBL3H72P9jOaiLnCNWQjfIAHegOuuH97Rq8WA5nNn0nYuSM7-4GLyk6dZBNAEvjQNDi2trxmxMXGNxtoRCfBXahFhBLBCWPds_vaACePEbUxt_NchN3HH8fDAWmDzCmGCOKmi80DUqyLBg"
    }
];

import { Link } from 'react-router-dom';

export default function ComingSoon() {
    return (
        <section className="container-xl py-5 mt-4">
            <h2 className="h2 fw-bold text-white mb-5 text-center text-uppercase" style={{ letterSpacing: '0.1em', fontWeight: 900 }}>
                Coming Soon to <span className="text-primary-custom">MoviView</span>
            </h2>

            <div className="row row-cols-2 row-cols-md-4 g-3 g-md-4">
                {movies.map((movie, index) => (
                    <div key={index} className="col">
                        <Link to="/movie/1" className="text-decoration-none">
                            <div className="movie-card group">
                                <div className="poster-wrapper mb-3">
                                    <img src={movie.poster} className="poster-img" alt={movie.title} />
                                    <div className="overlay"></div>
                                    <div className="position-absolute bottom-0 start-0 m-3">
                                        <span className="date-badge">{movie.date}</span>
                                    </div>
                                </div>
                                <h4 className="h6 fw-bold text-white text-truncate mb-0">{movie.title}</h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
