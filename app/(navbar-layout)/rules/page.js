'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RulesPage() {
    const [openSection, setOpenSection] = useState(null)

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section)
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Правила за Фентъзи Футбол "Betano League"</h1>

            <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                    <button
                        className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => toggleSection('deadlines')}
                    >
                        Краен срок и трансфери
                    </button>
                    {openSection === 'deadlines' && (
                        <div className="p-4 bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Краен срок:</strong> 1 час преди началото на първия мач от кръга.</li>
                                <li><strong>Бонус на капитана:</strong> Капитанът удвоява спечелените си точки.</li>
                                <li>
                                    <strong>Трансфери:</strong>
                                    <ul className="list-circle pl-6 mt-2 space-y-1">
                                        <li>1 безплатен трансфер на кръг.</li>
                                        <li>Неползваните трансфери се прехвърлят за следващия кръг.</li>
                                        <li>Всеки допълнителен трансфер над лимита струва -8 точки.</li>
                                    </ul>
                                </li>
                                <li><strong>Ограничение за играчи:</strong> Не повече от 2 играчи от един и същ отбор.</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <button
                        className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => toggleSection('squad')}
                    >
                        Избор на състав
                    </button>
                    {openSection === 'squad' && (
                        <div className="p-4 bg-white">
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Бюджет:</strong> 60 милиона.</li>
                                <li>
                                    <strong>Състав:</strong>
                                    <ul className="list-circle pl-6 mt-2 space-y-1">
                                        <li>1 Вратар (GK)</li>
                                        <li>3 Защитници (DEF)</li>
                                        <li>2 Халфа (MID)</li>
                                        <li>2 Нападатели (FWR)</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <button
                        className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => toggleSection('scoring')}
                    >
                        Точки
                    </button>
                    {openSection === 'scoring' && (
                        <div className="p-4 bg-white space-y-4">
                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Игрово време</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Участие в мача: 1 точка</li>
                                    <li>30+ минути игрово време: 2 точки</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Голове</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Гол на защитник (DEF): 6 точки</li>
                                    <li>Гол на халф (MID): 5 точки</li>
                                    <li>Гол на нападател (FWR): 4 точки</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Асистенции</h3>
                                <p>3 точки</p>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Сухи мрежи</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Вратар (GK): 5 точки</li>
                                    <li>Защитник (DEF): 5 точки</li>
                                    <li>Халф (MID): 1 точка</li>
                                </ul>
                                <p className="mt-2"><strong>Частична суха мрежа</strong> (само при 1 допуснат гол):</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Вратар (GK): 1 точка</li>
                                    <li>Защитник (DEF): 1 точка</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Дузпи</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Спечелена дузпа: 2 точки</li>
                                    <li>Направена дузпа: -2 точки</li>
                                    <li>Вкарана дузпа: Точките за гол</li>
                                    <li>Изпусната дузпа: -2 точки</li>
                                    <li>Спасена дузпа (GK): 4 точки</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Спасявания от вратаря</h3>
                                <p>На всеки 3 спасявания: 1 точка</p>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Допуснати голове</h3>
                                <p>За всеки 3 допуснати гола:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Вратар (GK): -1 точка</li>
                                    <li>Защитник (DEF): -1 точка</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Картони и автоголове</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Жълт картон: -1 точка</li>
                                    <li>Червен картон: -3 точки</li>
                                    <li>Автогол: -2 точки</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4">
                                <h3 className="font-semibold mb-2">Играч на мача</h3>
                                <p>4 точки</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <Link href="/team" className="inline-block px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-purple to-red hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Напред към Фентъзи
                </Link>
            </div>
        </div>
    )
}

