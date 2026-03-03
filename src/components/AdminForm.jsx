import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './AdminForm.css';

const AdminForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(''); // 'submitting', 'success', 'error'

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        dateRange: '',
        victor: '',
        note: '',
        facts: '',
        result: '',
        img: '',
        front: 'western'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Facts and results need to be arrays of strings (JSON)
        // Split by newline and remove empty lines
        const factsArray = formData.facts.split('\n').map(s => s.trim()).filter(s => s);
        const resultArray = formData.result.split('\n').map(s => s.trim()).filter(s => s);

        const battleToInsert = {
            name: formData.name,
            date: formData.date,
            dateRange: formData.dateRange,
            victor: formData.victor,
            note: formData.note,
            facts: factsArray,
            result: resultArray,
            img: formData.img || null, // Optional
            front: formData.front
        };

        const { error } = await supabase
            .from('battles')
            .insert([battleToInsert]);

        if (error) {
            console.error("Error inserting data:", error);
            setStatus('error');
        } else {
            setStatus('success');
            // Reset form
            setFormData({
                name: '', date: '', dateRange: '', victor: '', note: '', facts: '', result: '', img: '', front: 'western'
            });
            setTimeout(() => setStatus(''), 5000); // Clear success msg after 5s
        }
    };

    return (
        <div className="admin-container">
            {!isOpen ? (
                <button className="admin-toggle-btn" onClick={() => setIsOpen(true)}>
                    + Add New Battle
                </button>
            ) : (
                <div className="admin-form-panel glass-panel">
                    <div className="admin-header">
                        <h3>Add a New Battle to the Database</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    {status === 'success' && <div className="status-msg success">✅ Battle successfully added to Supabase database! Refresh the page to see it.</div>}
                    {status === 'error' && <div className="status-msg error">❌ Failed to add battle. Ensure you have run the SQL to allow Inserts in Supabase.</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Battle Name *</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Battle of Jutland" />
                            </div>
                            <div className="form-group">
                                <label>Front *</label>
                                <select name="front" value={formData.front} onChange={handleChange}>
                                    <option value="western">Western Front</option>
                                    <option value="eastern">Eastern Front</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Short Date *</label>
                                <input required type="text" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. 31 May–1 Jun 1916" />
                            </div>
                            <div className="form-group">
                                <label>Detailed Date Range *</label>
                                <input required type="text" name="dateRange" value={formData.dateRange} onChange={handleChange} placeholder="e.g. 31 May 1916 → 1 Jun 1916" />
                            </div>
                            <div className="form-group">
                                <label>Victor *</label>
                                <input required type="text" name="victor" value={formData.victor} onChange={handleChange} placeholder="e.g. Stalemate / British Strategic" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Short Summary Note *</label>
                            <input required type="text" name="note" value={formData.note} onChange={handleChange} placeholder="e.g. The largest naval battle of World War I..." />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Key Facts (One fact per line) *</label>
                                <textarea required name="facts" rows="4" value={formData.facts} onChange={handleChange} placeholder="- Fact 1...\n- Fact 2..." />
                            </div>
                            <div className="form-group half">
                                <label>Results (One result per line) *</label>
                                <textarea required name="result" rows="4" value={formData.result} onChange={handleChange} placeholder="- Result 1...\n- Result 2..." />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Image Path (Optional)</label>
                            <input type="text" name="img" value={formData.img} onChange={handleChange} placeholder="e.g. /Jutland.png (make sure the image is in the public folder)" />
                        </div>

                        <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Saving to Database...' : 'Save Battle to Database'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminForm;
